const express = require('express');
const app = express();
const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Get all Users
//@route GET / users
//@access Private

const getAllUsers = asyncHandler(async(req, res) => {
const users = await User.find().select('-password').lean()
if(!users?.length){
    return res.status(400).json({message: 'No single user was found'})
}
res.json(users)
})

// @desc create a New User
//@route POST / users
//@access Private

const createNewUser = asyncHandler(async (req, res) => {
const { username, password, roles } = req.body

//Data confirmation
if(!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({message: 'All fields are required'})
}

//Duplicate checks
const duplicate = await User.findOne({username}).lean().exec()
if (duplicate){
    return res.status(409).json({message: 'Duplicate username'})
}
 // Hashing the password
 const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
 const userObject = { username, "password": hashedPwd, roles}

 //Create and store new user
 const user = await User.create(userObject)

 if (user) {// created
res.status(201).json({ message: `New user by the name ${username}, has been created successfully`})
} else {
    res.status(400).json({message: 'Invalid user data received'})
}
})

// @desc Update a User
//@route PUT / users
//@access Private

const updateUser = asyncHandler(async (req, res) => {
const { id, username, roles, active, password } = req.body

// Data confirmation
if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
    return res.status(400).json({message: 'All fields are required'})
}
const user = await User.findById(id).exec()
if (!user){
    return res.status(400).json({message: 'User not found'})
}

//Duplicate checks
const duplicate = await User.findOne({username}).lean().exec()

//Allow update from the original user
if (duplicate && duplicate?._id.toString() !== id){
    return res.status(409).json({message: 'Duplicate user details'})
}
user.username = username
user.roles = roles 
user.active = active

if (password){
    //Hash password
    user.password = await bcrypt.hash(password, 10) // salt rounds 
}

const updatedUser = await user.save()
res.json({message: `${updatedUser.username} has been updated`})
})

// @desc Delete a User
//@route DELETE / users
//@access Private

const deleteUser = asyncHandler(async (req, res) => {
const {id} = req.body 

if (!id) {
    return res.status(400).json({message: 'User ID is required'})
}
const note = await Note.findOne({user: id}).lean().exec()
if (note) {
    return res.status(400).json({message: 'User has assigned notes'})
}

const user =  await User.findById(id).exec()
if (!user){
    return res.status(400).json({message: 'User not found'})
}

const results = await user.deleteOne()
const reply = `Username ${results.username} with ID ${results._id} has been deleted`
res.json(reply)
})
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}