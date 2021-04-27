const { readFileSync, writeFileSync } = require('fs');

const getTodosList = () => {
  const todoBuffer = readFileSync('data/todo.json');
  const todoString = todoBuffer.toString();

  if (!todoString) return [];
  const todos = JSON.parse(todoString);

  return todos;
};
const exist = ({ id }) => {
  const todos = getTodosList();
  const todo = todos.some((todo) => todo.id === id);
  return todo;
};
const write = async (todos) => {
  await writeFileSync('data/todo.json', JSON.stringify(todos));
};

module.exports = {
  getTodosList,
  exist,
  write,
};
