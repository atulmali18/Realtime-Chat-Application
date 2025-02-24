# 🗨️ Chat Application

This is a real-time chat application built with a Node.js backend and a React frontend. It supports user authentication, real-time messaging, and profile management.

## 🌟 Highlights

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client

## ✨ Features

- 🔐 User authentication (signup, login, logout)
- 💬 Real-time messaging using Socket.io
- 🖼️ Profile management with Cloudinary for image uploads
- 📱 Responsive design with Tailwind CSS and DaisyUI

## 🛠️ Technologies Used

### Backend

- 🟢 Node.js
- 🚀 Express.js
- 🗄️ MongoDB
- 📜 Mongoose
- 🔌 Socket.io
- ☁️ Cloudinary (for image uploads)

### Frontend

- ⚛️ React
- 🌿 Zustand (state management)
- 🎨 Tailwind CSS
- 💎 DaisyUI
- ⚡ Vite

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- [📥 Node.js](https://nodejs.org/)
- [📦 npm](https://www.npmjs.com/) or [🧶 yarn](https://yarnpkg.com/)
- [🗄️ MongoDB](https://www.mongodb.com/)

### 📌 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. Set up the backend:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

3. Set up the frontend:

   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```

### 🔑 Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```sh
MONGO_URI=your_mongodb_uri
PORT=5001
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

