import userModel from '../models/user.model.js';

const createUser = async ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    throw new Error('All fields are required');
  }
  
  const user = await userModel.create({
    fullName,
    email,
    password
  });

  return user;
};

export default { createUser }; 
