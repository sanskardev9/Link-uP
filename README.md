# 🚀 Link-uP

Link-uP is a modern **real-time chat application** built with **MERN (MongoDB, Express, React, Node.js)** and **Socket.io** for seamless messaging. It offers secure authentication, file uploads via **Cloudinary**, and a smooth user experience with real-time updates.

## 📌 Features
- **Real-time Messaging** – Uses **Socket.io** for instant chat updates.
- **Authentication & Security** – Secure login/register using **JWT authentication**.
- **User & Contact Management** – Store and manage user profiles in **MongoDB**.
- **Media Sharing** – Supports **image uploads** via **Cloudinary**.
---

## 🛠️ Setup

### 1️⃣ **Configure Environment Variables**
Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

### 2️⃣ **Install Dependencies**
Run the following command to install all required dependencies:

```sh
npm install
```

### 3️⃣ **Build the App**

```sh
npm run build
```

### 4️⃣ **Start the Server**

```sh
npm start
```

The server will be running at `http://localhost:5001/`

---

## 📜 API Endpoints

| Method | Endpoint         | Description                     |
|--------|----------------|--------------------------------|
| GET    | `/messages/:id` | Get all messages with a user    |
| POST   | `/messages`     | Send a new message              |
| GET    | `/users`        | Get all users                   |
| GET    | `/users/:id`    | Get user details by ID          |
| POST   | `/auth/register` | Register a new user            |
| POST   | `/auth/login`    | User login                      |

---

## 📸 Cloudinary Integration
LinkUp uses **Cloudinary** for media storage, allowing users to send **images and files** in chat. Ensure your API keys are correctly set in the `.env` file for **seamless uploads**.

---

## 🚀 Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **WebSockets:** Socket.io
- **Authentication:** JWT
- **File Storage:** Cloudinary
- **Middleware:** Express, dotenv
- **State Management:** Zustand
---

## 📌 Contribution
Feel free to fork this project, open issues, or submit pull requests to improve it!

💡 **Developed & maintained by Sanskar Singh**
