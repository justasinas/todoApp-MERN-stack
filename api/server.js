const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://adminas:labasrytas123@cluster0.6n9a4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
.then(() => console.log("Connected to DB"))
.catch(console.error)

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
});
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    console.log(`Task deleted`);
    res.json({result});
});
app.get('/todo/progress/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.progress = !todo.progress;
    todo.save();
    res.json(todo);
});

app.listen(3001, console.log("Server is running"))
