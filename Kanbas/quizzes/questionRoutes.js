import * as db from "../Database/index.js";

function QuestionRoutes(app) {
    // update question from database
    app.put("/api/questions/:qid", (req, res) => {
        const { qid } = req.params;
        const questionIndex = db.questions.findIndex(
            (q) => q._id === qid);
        db.questions[questionIndex] = {
            ...db.questions[questionIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // delete question from database
    const deleteQuestion = (req, res) => {
        const id = req.params.id;
        const index = db.questions.findIndex((question) => question._id === id);
        if (index !== -1) {
            db.questions.splice(index, 1);
            res.json(db.questions);
        } else {
            res.status(404).send(`Question with id ${id} not found`);
        }
    };
    app.delete("/api/questions/:id", deleteQuestion);

    // create new question & push to database
    app.post("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const newQuestion = {
            ...req.body,
            quiz: qid,
            _id: new Date().getTime().toString(),
        };
        db.questions.push(newQuestion);
        res.send(newQuestion);
    });

    // get questions
    app.get("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const questions = db.questions
            .filter((q) => q.quiz === qid);
        res.send(questions);
    });
}
export default QuestionRoutes;