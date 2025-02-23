import userModel from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id:userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server error' });
  }
}

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const { path } = image;
      const result = await cloudinary.uploader.upload(path);
      imageUrl = result.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // todo: Realtime functionality goes here = > socket.io

    res.status(201).json(newMessage);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server error' });
  }
}

export default { getUsersForSidebar, getMessages, sendMessage };