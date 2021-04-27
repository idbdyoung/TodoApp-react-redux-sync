const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

const Data = require('./lib/data/index');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/todos', async (req, res) => {
  const todos = await Data.todos.getTodosList();

  return res.send(todos);
});
app.post('/todos', async (req, res) => {
  try {
    const { text, color } = req.body;
    const todos = await Data.todos.getTodosList();
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 0,
      checked: false,
      text,
      color,
    };
    await Data.todos.write([...todos, newTodo]);
    res.statusCode = 200;

    return res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;

    return res.send(e);
  }
});
app.patch('/todos/:id', async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const todo = Data.todos.exist({ id: todoId });

    if (!todo) {
      res.statusCode = 404;

      return res.end();
    }
    const todos = Data.todos.getTodosList();
    const changedTodos = todos.map(todo => {
      if (todo.id === todoId) return { ...todo, checked: !todo.checked };

      return todo;
    });
    await Data.todos.write(changedTodos);
    res.statusCode = 200;

    return res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;

    return res.send(e);
  }
});
app.delete('/todos/:id', async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const todo = Data.todos.exist({ id: todoId });

    if (!todo) {
      res.statusCode = 404;

      return res.end();
    }
    const todos = Data.todos.getTodosList();
    const filteredTodos = todos.filter(todo => (todo.id !== todoId));
    await Data.todos.write(filteredTodos);
    res.statusCode = 200;

    return res.end();
  } catch (e) {
    res.statusCode = 500;

    return res.send(e);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
