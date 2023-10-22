
const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
 
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
 
const AuthController = {
    login: async (req, res) => {
        try {
          const { uid, password } = req.body;
      
 
          if (!uid || uid.trim() === '') {
            return res.status(400).json({ error: 'Username or Email is required' });
          }
      
 
          if (!password || password.trim() === '') {
            return res.status(400).json({ error: 'Password is required' });
          }
 
          const user = await UserModel.findOne({
            $or: [{ username: uid }, { email: uid }],
          });
      
          if (!user) {
            return res.status(400).json({ error: 'User not found' });
          }
      
 
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
          }
          const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1000h' });
      
          res.status(200).json({ message: 'Login successful', token, user });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      
      
  register: async (req, res) => {
 
    try {
      const { firstname, lastname, username, email, password } = req.body;

      
      const existingUserWithEmail = await UserModel.findOne({ email });
      if (existingUserWithEmail) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      
      const existingUserWithUsername = await UserModel.findOne({ username });
      if (existingUserWithUsername) {
        return res.status(400).json({ error: 'Username is already taken' });
      }

      
      if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }
      const hashedPassword = await bcrypt.hash(password, 10) 

      
      const newUser = new UserModel({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        isverfied: false, 
        description: '',   
      });

      
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

      res.status(201).json({ message: 'Registration successful', token, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getUserDataFromToken: async (req, res) => {
    try {
      const token = req.body.headers.Authorization;  
   

      if (!token) {
      
        return res.status(401).json({ error: 'Token is missing' });
      }

 
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
      
          return res.status(401).json({ error: 'Token is invalid' });
        }
    
        console.log(decoded)
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            console.log("mdan")
          return res.status(404).json({ error: 'User not found' });
        }

 
        res.status(200).json({ message: 'User data fetched successfully', user });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AuthController;
