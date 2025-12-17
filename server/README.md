# NexaSpace – Server (Node.js + Express + MongoDB)

This is the **backend API** and realtime server for the NexaSpace social media application.

Built with:

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **bcryptjs** for password hashing
- **Multer + Sharp** for media uploads & image processing
- **Socket.io** for realtime features (chats, notifications – WIP)
- Security middleware: **helmet**, **cors**, **express-rate-limit**, **cookie-parser**, etc.

---

## ✨ Features (Server-Side)

- **Authentication & Roles**
  - Register, Login, Logout
  - `/auth/me` to get the current user
  - JWT-based auth (access token), stored & sent by the frontend
  - Role support: `user`, `admin`

- **User Profiles**
  - Basic profile fields: name, username, email, bio, location, avatar/profilePic, verified flag, etc.
  - `GET /users/me` – get own profile
  - `PATCH /users/me` – update profile
  - `POST /users/me/avatar` – upload avatar image (multer + sharp)
  - Search users by name/username (for follow & chats)

- **Follow System**
  - `POST /users/:id/follow` – follow a user
  - `DELETE /users/:id/follow` – unfollow a user
  - `GET /users/:id/followers`
  - `GET /users/:id/following`
  - `followersCount` / `followingCount` returned so UI cards can show counts
  - Home feed uses the list of followed users (+ self)

- **Posts & Feed**
  - `POST /posts` – create a post with text + optional image
  - `GET /feed` – paginated home feed for the current user
  - `GET /posts/:id` – get single post details
  - Media stored under `/uploads/posts/` and served statically

- **Chats (1–1)**
  - `GET /chats` – list chats for the logged-in user
  - `POST /chats/start` – start or reuse a chat between two users
  - `GET /chats/:chatId/messages` – list messages in a chat
  - `POST /chats/:chatId/messages` – send message via HTTP
  - **Socket.io events**:
    - `chat:join`
    - `chat:message`
    - `chat:typing`
    - `chat:seen`
  - Models:
    - `Chat` – participants, lastMessage, timestamps
    - `Message` – sender, content, chat, seen status

- **Admin (WIP)**
  - `/admin/dashboard` – aggregate metrics
  - Admin-only routes guarded by `admin.middleware`

- **Other**
  - Centralized error handling (`ApiError`, `ApiResponse`, `error.middleware`)
  - Rate limiting for auth & public routes
  - CORS config for local dev
  - Background jobs (e.g., story expiration, notification cleanup – planned)

---

Getting Started (Server)
1. Install dependencies

From the server directory:

cd server
npm install

2. Environment variables

Create a .env file in server/ (same level as package.json), using .env.example as a reference. Typical entries:

# Server
PORT=5000
NODE_ENV=development

# MongoDB (Atlas or local)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority

# JWT secrets – change these to strong random values
JWT_ACCESS_SECRET=your-very-secret-access-key
JWT_ACCESS_EXPIRES_IN=7d


If you are using local MongoDB, MONGODB_URI might look like:

MONGODB_URI=mongodb://127.0.0.1:27017/nexaspace


⚠️ Never commit the real .env file to git; only .env.example.

3. Run the dev server

Using nodemon (commonly set up as npm run dev):

npm run dev


By default the API will be available at:

http://localhost:5000/api/v1


Make sure the client is configured to point to this base URL.

