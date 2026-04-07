# Social Post App

A full-stack social media application where users can sign up, create posts,
like/unlike posts, and comment — built with React on the frontend and
Node.js/Express/MongoDB on the backend.

**Live:** https://w3-mini-social-post-app.vercel.app

---

## Tech Stack

### Frontend
- React 19, Vite
- React Bootstrap
- React Router DOM v7
- Axios

### Backend
- Node.js, Express 5
- MongoDB, Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cookie-parser, cors, dotenv

---

## Features

- User signup and login with bcrypt password hashing
- JWT authentication via HTTP-only cookie + Authorization Bearer header
- Create posts with text and/or image URL
- Like and unlike posts (toggle)
- Comment on posts
- Chronological feed (newest first)
- Protected routes via auth middleware

---

## Project Structure
```
w3-mini-social-post-app/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── userController.js
│       │   └── postController.js
│       ├── middlewares/
│       │   └── authMiddleware.js
│       ├── models/
│       │   ├── User.js
│       │   └── Post.js
│       ├── routes/
│       │   ├── userRoutes.js
│       │   └── postRoutes.js
│       ├── utils/
│       │   └── helpers/
│       │       └── generateTokenAndSetCookies.js
│       └── server.js
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js
        ├── components/
        │   ├── AppNavbar.jsx
        │   ├── CreatePost.jsx
        │   └── PostCard.jsx
        ├── pages/
        │   ├── AuthPage.jsx
        │   └── HomePage.jsx
        └── App.jsx
```
---

## API Endpoints

### Auth — `/api/users`
| Method | Endpoint   | Auth | Description         |
|--------|------------|------|---------------------|
| POST   | /signup    | No   | Register new user   |
| POST   | /login     | No   | Login, returns JWT  |
| POST   | /logout    | No   | Clear JWT cookie    |
| GET    | /me        | Yes  | Get current user    |

### Posts — `/api/post`
| Method | Endpoint        | Auth | Description          |
|--------|-----------------|------|----------------------|
| POST   | /               | Yes  | Create a post        |
| GET    | /               | No   | Get all posts        |
| PUT    | /like/:id       | Yes  | Like / unlike post   |
| POST   | /comment/:id    | Yes  | Comment on a post    |

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/kN1ghtOwlx/w3-mini-social-post-app.git
cd w3-mini-social-post-app
```

### 2. Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
```bash
npm run dev
```

Backend runs at `http://localhost:5001`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Auth Note

This app uses dual token delivery to support cross-domain deployment.
The JWT is set as an HTTP-only cookie and also returned in the response body.
The frontend stores it in localStorage and attaches it as a Bearer token
via an Axios request interceptor on every API call.

---

## Deployment

- Frontend → Vercel
- Backend → Render

---

## Author

**Vinayak Vishwakarma** — [github.com/kN1ghtOwlx](https://github.com/kN1ghtOwlx)
