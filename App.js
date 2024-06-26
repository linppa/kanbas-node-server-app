import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Kanbas/courses/coursesRoutes.js';
import ModuleRoutes from './Kanbas/modules/moduleRoutes.js';
import AssignmentRoutes from './Kanbas/assignments/assignmentRoutes.js';

import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);

Lab5(app);
Hello(app);
app.listen(4000 || process.env.PORT);
