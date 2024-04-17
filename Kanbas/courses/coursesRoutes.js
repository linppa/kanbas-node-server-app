// import * as Database from "../Database/index.js";

// export default function CourseRoutes(app) {
//     // delete course by id
//     const deleteCourse = (req, res) => {
//       const id = req.params.id;
//       const index = Database.courses.findIndex((course) => course._id === id);
//       if (index !== -1) {
//         Database.courses.splice(index, 1);
//         res.json(Database.courses);
//       } else {
//         res.status(404).send(`Course with id ${id} not found`);
//       }
//     };
//     app.delete("/api/courses/:id", deleteCourse);  
    
//     // update course by id
//     const updateCourse = (req, res) => {
//       const id = req.params.id;
//       const index = Database.courses.findIndex((course) => course._id === id);
//       if (index !== -1) {
//         Database.courses[index] = { ...Database.courses[index], ...req.body };
//         res.json(Database.courses);
//       } else {
//         res.status(404).send(`Course with id ${id} not found`);
//       }
//     };
//     app.put("/api/courses/:id", updateCourse);

//     // create new course & add to database
//     app.post("/api/courses", (req, res) => {
//         const course = {
//             ...req.body,
//             _id: new Date().getTime().toString(),
//         };
//         Database.courses.push(course);
//         res.send(course);
//     });

//     // get all courses
//     app.get("/api/courses", (req, res) => {
//         const courses = Database.courses;
//         res.send(courses);
//     });

//     // get course by id
//     app.get("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = Database.courses
//           .find((c) => c._id === id);
//         if (!course) {
//           res.status(404).send("Course not found");
//           return;
//         }
//         res.send(course);
//       });
// }