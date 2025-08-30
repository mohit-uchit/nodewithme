const responseHandle = require('../helpers/responseHandle');
const todoService = require('../services/todo/todoService');

const createTodo = async (req, res) => {
  try {
    const data = await todoService.createTodo(req.user.id, req.body);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const listTodo = async (req, res) => {
  try {
    const data = await todoService.listTodo(req.user.id);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const getTodoById = async (req, res) => {
  try {
    const data = await todoService.getTodoById(req.user.id, req.params.id);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const updateTodo = async (req, res) => {};

const deleteTodo = async (req, res) => {};

module.exports = {
  createTodo,
  listTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
