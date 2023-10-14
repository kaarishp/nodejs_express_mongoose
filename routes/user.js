const express = require("express")
const employeeModel = require('../models/User')
const Employee = require("../models/User")

const routes = express.Router()

const users = []; 

//Allow user to create new account
//http://localhost:3001/api/v1/user/signup
routes.post('/signup', (req, res) => {
    const user = req.body;
  
    if (!user || !user.username || !user.password) {
      res.status(400).json({ message: 'Username and password are required' });
    } else {
      
      const existingUser = users.find((u) => u.username === user.username);
      if (existingUser) {
        res.status(409).json({ message: 'Username already exists' });
      } else {
        users.push(user);
        res.status(201).json({ message: 'User account created successfully' });
      }
    }
  });

//Allow user to access the system
//http://localhost:3001/api/v1/user/login
routes.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
  
    if (user && user.password === password) {
      res.status(200).json({
        status: true,
        username,
        message: 'User logged in successfully',
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'Invalid Username and password',
      });
    }
});

module.exports = routes