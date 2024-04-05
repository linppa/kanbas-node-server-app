import * as db from "../Database/index.js";

function AssignmentRoutes(app) {
    // update assignment from database
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === aid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // delete assignment from database
    const deleteAssignment = (req, res) => {
        const id = req.params.id;
        const index = db.assignments.findIndex((assignment) => assignment._id === id);
        if (index !== -1) {
            db.assignments.splice(index, 1);
            res.json(db.assignments);
        } else {
            res.status(404).send(`Assignment with id ${id} not found`);
        }
    };
    app.delete("/api/assignments/:id", deleteAssignment);

    // create new assignment & push to database
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // get assignments
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
        res.send(assignments);
    });
}
export default AssignmentRoutes;