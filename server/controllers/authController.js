import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../utils/error.js';

const JWT_SECRET = 'your-local-secret-key';

// Register new user
export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, 'User already exists'));
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};