import userModel from '../models/user.model.js';
import userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import blacklistTokenModel from '../models/BlacklistToken.model.js';
import cloudinary from '../lib/cloudinary.js';

// Error Handling Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await userModel.hashPassword(password);
  const newUser = await userService.createUser({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = await newUser.generateAuthToken(newUser._id);
  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,      
    sameSite: "None",   
  });

  res.status(201).json({ newUser, token });
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid Email or Password' });
  }

  const token = await user.generateAuthToken();
  res.cookie('token', token);

  res.status(200).json({ 
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic || null, // Assuming the user model has a profilePic field
    token: token,
   });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});



const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No user logged in' });
  }

  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.status(200).json({ message: 'Logged out successfully' });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const {profilePic} = req.body;
  const userId = req.user._id;
  if(!profilePic) {
    return res.status(400).json({ message: 'Profile picture is required' });
  }

  await cloudinary.uploader.upload(profilePic, async (error, result) => {
    if (error) {
      return res.status(400).json({ message: 'Error uploading profile picture' });
    }
    const updatedUser = await userModel.findByIdAndUpdate(userId, { profilePic: result.secure_url }, { new: true });
    res.status(200).json(updatedUser);
  });
});

const checkAuth = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default { registerUser, loginUser, getUserProfile, logoutUser, updateUserProfile, checkAuth};
