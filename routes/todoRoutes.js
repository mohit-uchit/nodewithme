const router = require('express').Router();
const todoController = require('../controller/todoController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', todoController.createTodo);
router.get('/', todoController.listTodo);
router.get('/:id', todoController.getTodoById);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;