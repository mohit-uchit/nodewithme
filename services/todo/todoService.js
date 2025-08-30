const Todo = require('../../models/todo');

/**
 * Creates a new todo
 * @param {string} userId The id of the user creating a todo.
 * @param {object} payload The payload for creating a new todo.
 */
const createTodo = async (userId, payload) => {
  const data = await Todo.create({
    userId: userId,
    title: payload.title,
    description: payload.description,
    dueDate: payload.dueDate || null,
    priority: payload.priority || 'medium',
  });

  return {
    id: data._id,
  };
};

const listTodo = async () => {};

const getTodoById = async () => {};

const updateTodo = async () => {};

const deleteTodo = async () => {};

module.exports = {
  createTodo,
  listTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
