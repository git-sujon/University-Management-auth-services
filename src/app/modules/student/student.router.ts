import express from 'express';
import { StudentController } from './student.controller';


const router = express.Router();



router.get('/', StudentController.getAllStudentController);

export const studentRoute = router;
