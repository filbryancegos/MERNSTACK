const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register new user
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email  });

    if (userExists) {
      return res.status(400).json('Email already exists');
    }

    const user = new User({ username, email, password });

    await user.save();

    res.status(201).json('User registered successfully');
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email  });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json('Invalid email  or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'ekingbrutos', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
}

module.exports = {
  login,
  register,
}


