import * as db from "../Database/index.js";

function QuizzesRoutes(app) {
    // update quiz from database
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex(
            (q) => q._id === qid);
        db.quizzes[quizIndex] = {
            ...db.quizzes[quizIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // delete quiz from database
    const deleteQuiz = (req, res) => {
        const id = req.params.id;
        const index = db.quizzes.findIndex((quiz) => quiz._id === id);
        if (index !== -1) {
            db.quizzes.splice(index, 1);
            res.json(db.quizzes);
        } else {
            res.status(404).send(`Quiz with id ${id} not found`);
        }
    };
    app.delete("/api/quizzes/:id", deleteQuiz);

    // create new quiz & push to database
    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.quizzes.push(newQuiz);
        res.send(newQuiz);
    });

    // get quizzes
    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes
            .filter((q) => q.course === cid);
        res.send(quizzes);
    });
}
export default QuizzesRoutes;

