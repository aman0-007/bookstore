import { createError } from '../utils/error.js';

export const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, 'Email and password are required'));
  }

  if (password.length < 6) {
    return next(createError(400, 'Password must be at least 6 characters'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(createError(400, 'Invalid email format'));
  }

  next();
};