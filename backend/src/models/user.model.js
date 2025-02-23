import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    type: 'string',
    required: [true, 'Fullname is required'],
    minlength: [3, 'Fullname must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    minlength: [10, 'Minimum length of email should be at least 10']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  profilePic: {
    type: String,
  }
},
  { timestamps: true }
);

// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Hash Password
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
