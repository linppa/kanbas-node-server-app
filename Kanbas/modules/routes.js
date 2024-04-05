import * as db from "../Database/index.js";

function ModuleRoutes(app) {
    // update module from database
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex(
            (m) => m._id === mid);
        db.modules[moduleIndex] = {
            ...db.modules[moduleIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // delete module from database
    const deleteModule = (req, res) => {
        const id = req.params.id;
        const index = db.modules.findIndex((module) => module._id === id);
        if (index !== -1) {
            db.modules.splice(index, 1);
            res.json(db.modules);
        } else {
            res.status(404).send(`Module with id ${id} not found`);
        }
    };
    app.delete("/api/modules/:id", deleteModule);

    // create new module & push to database
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
    });

    // get modules for a given course
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules
            .filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;