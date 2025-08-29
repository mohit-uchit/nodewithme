const router = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middleware/authMiddleware')

router.post('/register', userController.register);

router.post('/login', userController.login);

router.patch('/refresh', userController.refresh);

router.post('/logout', auth, userController.logOut)

router.patch('/updatePass', auth, userController.updatePassword)

module.exports = router;