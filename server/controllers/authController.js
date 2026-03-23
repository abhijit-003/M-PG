const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('LOGIN ATTEMPT - email:', email, 'role:', role, 'pw length:', password.length);
    
    const user = await User.findByEmail(email);
    console.log('User found:', user);
    
    if (!user) {
      console.log('No user');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (user.role !== role) {
      console.log('Role mismatch:', user.role, '!=', role);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const pwMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', pwMatch, 'user.pw length:', user.password.length);
    
    if (!pwMatch) {
      console.log('Pw mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = authService.generateToken(user.id, user.role);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
const { email, password, full_name, age, role } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPw, full_name, age, role });
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({ message: 'Registration failed' });
  }
};


