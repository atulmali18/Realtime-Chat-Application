import userModel from '../models/user.model.js';
import blackListTokenModel from '../models/BlacklistToken.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'User is unauthorized' });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'User is Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id).select('-password');
    return next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};

export default {authUser};
