// Assignment object
const assignment = {
    id: 1,
    title: 'NodeJS Assignment',
    description: 'Create a NodeJS server with ExpressJS',
    due: '2021-10-10',
    completed: false,
    score: 0,
};

// Module object
const module = {
    id: 1,
    name: 'NodeJS',
    description: 'Learn NodeJS with ExpressJS',
    course: 'Web Development',
};

// Todo array
const todos = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    { id: 4, title: 'Take 4', completed: true },
];

const Lab5 = (app) => {
    // ----- create route to welcome users to assignment 5 -----
    app.get('/a5/welcome', (req, res) => {
        res.send('Welcome to Assignment 5');
    });

    // ----- path parameters from URL -----
    // ADD
    app.get('/a5/add/:a/:b', (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    // SUBTRACT
    app.get('/a5/subtract/:a/:b', (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });
    // MULTIPLY
    app.get('/a5/multiply/:a/:b', (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) * parseInt(b);
        res.send(sum.toString());
    });
    // DIVIDE
    app.get('/a5/divide/:a/:b', (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) / parseInt(b);
        res.send(sum.toString());
    });

    // ----- query parameters from URL -----
    // ADD
    app.get('/a5/calculator', (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case 'add':
                result = parseInt(a) + parseInt(b);
                break;
            case 'subtract':
                result = parseInt(a) - parseInt(b);
                break;
            case 'multiply':
                result = parseInt(a) * parseInt(b);
                break;
            case 'divide':
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = 'Invalid operation';
        }
        res.send(result.toString());
    });

    // ASSIGNMENT OBJECT
    // ----- create route to get assignment (object) -----
    app.get('/a5/assignment', (req, res) => {
        res.json(assignment);
    });

    // ----- get assignment title (object properties) -----
    app.get('/a5/assignment/title', (req, res) => {
        res.send(assignment.title);
    });

    // ----- modify objects or properties -----
    app.get('/a5/assignment/title/:newTitle', (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // MODULE OBJECT
    // ----- create route to module (object) -----
    app.get('/a5/module', (req, res) => {
        res.json(module);
    })
    // ----- get module name (object properties) -----
    app.get('/a5/module/name', (req, res) => {
        res.send(module.name);
    });
    // ----- modify objects or properties -----
    app.get('/a5/module/name/:newName', (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    // TODO ARRAY
    // 3.5.1
    // ----- using HTTP post method -----
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });


    // ----- create route to todo (array) -----
    app.get('/a5/todos', (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === 'true';
            const completedTodos = todos.filter(
                (todo) => todo.completed === completedBool);
            res.json(completedTodos);
            return;
        }
        res.json(todos);
    });
    // ----- create route to add todo -----
    app.get('/a5/todos/create', (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: 'New Task',
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });
    // ----- get todo by id -----
    app.get('/a5/todos/:id', (req, res) => {
        const { id } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        res.json(todo);
    });

    // ----- delete todo by HTTP delete method -----
    app.delete('/a5/todos/:id', (req, res) => {
        const { id } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        if (!todo) {
            res.status(404)
                .json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });

    // ----- delete todo by id -----
    app.get('/a5/todos/:id/delete', (req, res) => {
        const { id } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1);
        }
        res.json(todos);
    });

    // ----- update todo by HTTP put method -----
    app.put('/a5/todos/:id', (req, res) => {
        const { id } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        if (!todo) {
            res.status(404)
                .json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
    });

    // ----- update todo by id -----
    app.get('/a5/todos/:id/title/:title', (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    // ----- edit completed status by id -----
    app.get('/a5/todos/:id/completed/:completed', (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        todo.completed = completed === 'true';
        res.json(todos);
    }
    );

    // ----- edit description by id -----
    app.get('/a5/todos/:id/description/:description', (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    })

};
export default Lab5;