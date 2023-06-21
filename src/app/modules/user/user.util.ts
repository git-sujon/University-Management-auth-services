import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: 'student' }, { id: -1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId?.id.substring(4) : undefined;
};
const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: 'faculty' }, { id: -1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId?.id.substring(2) : undefined;
};

export const generateStudentID = async (
  academicSemester: IAcademicSemester
): Promise<string | undefined> => {
  const lastId = await findLastStudentId();

  // const isInclude = `${academicSemester.year.substring(2)}${
  //   academicSemester.code
  // }`;

  // if (lastId?.includes(isInclude)) {
  //   lastId = lastId.replace(isInclude, '');
  // }
  const currentId = lastId || (0).toString().padStart(5, '0');

  let incrementID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  //2025
  incrementID = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementID}`;
  return incrementID;
};

export const generateFacultyID = async (): Promise<string | undefined> => {
  const lastId = await findLastFacultyId();

  const currentId = lastId || (0).toString().padStart(5, '0');

  let incrementID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementID = `F-${incrementID}`;
  return incrementID;
};
