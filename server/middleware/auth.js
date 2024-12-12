import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

const JWT_SECRET = 'your-local-secret-key';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return next(createError(401, 'Access denied. No token provided.'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, 'Invalid token.'));
  }
};