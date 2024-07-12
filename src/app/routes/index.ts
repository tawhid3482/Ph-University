import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { StudentRoutes } from '../modules/students/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route))

export default router;
