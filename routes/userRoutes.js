const express = require('express')
const router = express.Router()
const usersController = require('../controller/userController')

// Define routes for different CRUD operations
router.route('/')
.get(usersController.getAllUsers)
.post(usersController.createNewUser)
.put(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports = router

