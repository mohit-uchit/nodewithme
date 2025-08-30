const Todo = require('../../models/todo');
const { formatDate } = require('../../helpers/dateHelper');
const constants = require('../../config/constants')

// DRY => BAD CODE => SHIT DEVELOPER 
// Do not repeat yourself

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

const listTodo = async (userId) => {
   const todos = await Todo.find({ userId: userId})
   return { todos }
};

const getTodoById = async (userId, todoId) => {
  const todo = await Todo.findOne({
    _id: todoId,
    userId: userId,
    deletedAt: null,
  });
  if (!todo) {
    throw new Error('Todo not found.');
  }

  return {
    id: todo._id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    dueDate: formatDate(todo.dueDate, constants.dateTimeFormat),
    priority: todo.priority,
    updatedAt: formatDate(todo.updatedAt, constants.dateTimeFormat),
  };
};

const updateTodo = async () => {};

const deleteTodo = async () => {};

module.exports = {
  createTodo,
  listTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
