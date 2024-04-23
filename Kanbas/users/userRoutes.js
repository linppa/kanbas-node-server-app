import * as db from "../Database/index.js";

function UserRoutes(app) {
    // update user from database
    app.put("/api/users/:uid", (req, res) => {
        const { uid } = req.params;
        const userIndex = db.users.findIndex(
            (u) => u._id === uid);
        db.users[userIndex] = {
            ...db.users[userIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // delete user from database
    const deleteUser = (req, res) => {
        const id = req.params.id;
        const index = db.users.findIndex((user) => user._id === id);
        if (index !== -1) {
            db.users.splice(index, 1);
            res.json(db.users);
        } else {
            res.status(404).send(`User with id ${id} not found`);
        }
    };
    app.delete("/api/users/:id", deleteUser);

    // create new user & push to database
    app.post("/api/users", (req, res) => {
        const newUser = {
            ...req.body,
            _id: new Date().getTime().toString(),
        };
        db.users.push(newUser);
        res.send(newUser);
    });

    // get all users
    app.get("/api/users", (req, res) => {
        res.send(db.users);
    });
}

export default UserRoutes;