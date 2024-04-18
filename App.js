import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Kanbas/courses/coursesRoutes.js';
import ModuleRoutes from './Kanbas/modules/moduleRoutes.js';
import AssignmentRoutes from './Kanbas/assignments/assignmentRoutes.js';
import mongoose from 'mongoose';
import UserRoutes from "./Users/routes.js";
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://linppa:starry1996@kanbas.t9uxn1e.mongodb.net/?retryWrites=true&w=majority"

const CONNECTION_STRING =
    DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

console.log(CONNECTION_STRING);
console.log(process.env.FRONTEND_URL)
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);

Lab5(app);
Hello(app);
app.listen(4000 || process.env.PORT);
