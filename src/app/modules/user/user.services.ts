import mongoose from 'mongoose';
import config from '../../../config/index';
import APIError from '../../../errors/ApiErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentID } from './user.util';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default increment ID

  // default DEFAULT_PASSWORD
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set Role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();




  // generate student id

  let newUserAllData =null

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const generatedId = await generateStudentID(academicSemester);

  




    user.id = generatedId;
    student.id = generatedId;

    const newStudent = await Student.create([student], { session });



    if (!newStudent.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
    }

    user.student= newStudent[0]._id
    const newUser= await User.create([user], {session})

    console.log("newUser:", newUser.length)


    if(!newUser.length){
      throw new APIError(httpStatus.BAD_REQUEST, "Failed to create User")
    }

    newUserAllData = newUser[0]



    await session.commitTransaction()
    await session.endSession()


  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if(newUserAllData){
    newUserAllData= await User.findOne({id:newUserAllData.id}).populate({
      path:'student',
      populate:[
        {
          path:'academicDepartment'
        },
        {
          path:'academicFaculty'
        },
        {
          path:'academicSemester'
        },
      ]
    })

    return newUserAllData
  }

  const creteUser = await User.create(user);

  if (!creteUser) {
    throw new APIError(400, 'Failed to created a user!');
  }

  return creteUser;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createStudent,
  getAllUsers,
};
