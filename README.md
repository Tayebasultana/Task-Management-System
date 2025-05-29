# 🌸 Flowra – Personal Task Management System

**Flowra** (inspired by the Bengali word "ফ্লোরা", symbolizing growth, flow, and blossoming) is a beautifully designed personal task and goal management system. It helps individuals streamline their day-to-day activities, set meaningful goals, and stay organized and productive—just like a flower blooming through structure and discipline.

🌐 **Live Demo:** [Visit Flowra](https://task-management-system-3028a.web.app)

---

## ✨ Why Flowra?

In a fast-paced world, staying organized is key to personal growth. Flowra isn't just another task app—it's a **daily companion** designed for:

- Students tracking assignments
- Professionals managing work goals
- Creatives organizing projects
- Anyone who wants to live more intentionally

By combining task management with goal-setting and motivational tools, **Flowra** inspires productivity and balance.

---

## 🚀 Features

- 🔐 Secure User Authentication (Email/Password & Google)
- 🧾 JWT-based Authorization System
- ✅ Create, Update, and Delete Tasks Easily
- 📅 Set Weekly & Monthly Goals
- 📈 Mark Goals as Completed and Track Progress
- 🔍 Filter Tasks by User
- 🧠 Get Daily Motivational Quotes
- 💾 Data saved securely in MongoDB
- 🔒 Backend API routes protected via JWT

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Axios
- date-fns

### Backend:
- Node.js
- Express.js
- MongoDB (Native Driver)
- JSON Web Token (JWT)
- dotenv
- cors

---

## 📁 Project Structure

flowra/
├── client/ # React Frontend
├── server/ # Express Backend API
├── .env # Environment variables
└── README.md


---

## ⚙️ Setup Instructions

### 🔽 Clone the Repository

```bash
git clone https://github.com/your-username/flowra.git
cd flowra
```
## 🛠️ Backend Setup (Express + MongoDB)
1. Navigate to Backend Folder

```bash
cd server
```

2. Create .env file
```bash
PORT=5000
USER_DB=yourMongoDBUsername
USER_PASS=yourMongoDBPassword
ACCESS_TOKEN_SECRET=yourJWTSecret
```
3. Install Dependencies
```bash
npm install
```
4. Run Backend Server
```bash
npm run dev
```
## 💻 Frontend Setup (React + Firebase)
1. Navigate to Frontend Folder
```bash
cd ../client
```
2. Create Firebase Configuration
Inside src/firebase/firebase.init.js:
```bash
import { initializeApp } from "firebase/app";
```
```bash
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

export const app = initializeApp(firebaseConfig);
```
3. Optional .env for Frontend
```bash
VITE_API_URL=http://localhost:5000
```
4. Install Frontend Dependencies
```bash
npm install
```
5. Run Frontend Server
```bash
npm run dev
```
