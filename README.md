# NexaSpace – Social Media App (MERN + Realtime)

NexaSpace is a full-stack **social media application** built with the MERN stack, featuring:

- Modern landing & auth experience
- User profiles with avatars & bios
- Home feed with posts (text + image)
- Follow system (followers / following)
- 1–1 chats with realtime messaging (Socket.io)
- Admin dashboard (foundation in place)

The project is structured as a monorepo with two main apps:

- `client/` – React + Vite + Tailwind CSS frontend
- `server/` – Node.js + Express + MongoDB + Socket.io backend

---

## 🧱 Tech Stack

**Frontend**

- React 18 (SPA)
- Vite
- React Router
- Tailwind CSS
- Axios
- Context API (Auth, UI, Socket)
- Socket.io Client (for chats/notifications – WIP)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- bcryptjs for password hashing
- Multer + Sharp for file uploads & image processing
- Socket.io for realtime features
- Helmet, CORS, express-rate-limit, cookie-parser, etc.

---

## ✨ Core Features (Current & Planned)

### Implemented so far

- **Public Landing & Static Pages**
  - `/` – Landing page
  - `/about`
  - `/help`

- **Authentication & Roles**
  - Register (`/register`)
  - Login (`/login`)
  - Logout
  - `/auth/me` to fetch current user
  - Role: `user`, `admin` (used for admin routes)

- **User Profile**
  - My Profile (`/profile/me`)
  - Edit Profile (`/profile/edit`)
  - Avatar upload (`/users/me/avatar`)
  - Profile fields: name, username, email, bio, location, profile image, verified, etc.

- **App Shell & Dashboard**
  - `AppLayout` with Top Navbar, search bar, profile menu
  - Dashboard (`/dashboard`) with:
    - Left: Followers / Following / Favorites card
    - Center: Home feed
    - Right: Quick navigation / shortcuts

- **Posts & Feed**
  - Create Post (`/posts/create`) with text + optional image
  - Home feed (`/feed` on backend, `/dashboard` on frontend)
  - Posts stored in MongoDB, images in `/uploads/posts/`
  - Feed shows posts from self + followed users (via follow system)

- **Follow System**
  - Follow/unfollow users
  - Follower / following lists:
    - `/profile/me/followers`
    - `/profile/me/following`
  - Counts surfaced to dashboard cards

- **Chats (1–1 Messaging)**
  - Chats list (`/chats`)
  - Chat room (`/chats/:chatId`)
  - HTTP endpoints for listing chats and sending messages
  - Socket.io wiring on server + basic client integration for realtime messages (in progress)

- **Admin Foundation**
  - Admin dashboard route (`/admin`) guarded by `AdminRoute` & `admin.middleware`
  - Admin layout shell ready for metrics & management tools

### Planned / Designed

The architecture is already laid out for future features, including:

- Stories (create, view, auto-expire)
- Notifications (likes, comments, follows, chats, new posts)
- Explore & Search (trending posts, user search)
- Admin user management, content tools (featured posts, announcements)
- Account/security extras (reset password, activity logs, etc.)

---

## 📂 Project Structure

At the top level:

```text
nexaspace/
├── client/          # React + Vite + Tailwind frontend
├── server/          # Node + Express + MongoDB backend
├── .gitignore
├── package.json     # (optional) root, if you use concurrently
└── README.md        # this file



Getting Started
1. Prerequisites

Node.js (ideally v18+)

npm

MongoDB

Either local MongoDB (mongodb://127.0.0.1:27017/nexaspace)

Or MongoDB Atlas (connection string in .env)

2. Backend Setup (server/)

From the project root:

cd server
npm install


Create a .env file in the server/ folder (same level as package.json) following .env.example. Typical values:

PORT=5000
NODE_ENV=development

# Local Mongo:
# MONGODB_URI=mongodb://127.0.0.1:27017/nexaspace

# or MongoDB Atlas:
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority

JWT_ACCESS_SECRET=your-very-secret-access-key
JWT_ACCESS_EXPIRES_IN=7d


Run the backend in dev mode:

npm run dev


By default your API will be available at:

http://localhost:5000/api/v1

3. Frontend Setup (client/)

From the project root:

cd client
npm install


Create a .env file in the client/ folder with:

VITE_API_BASE_URL=http://localhost:5000/api/v1


Run the frontend:

npm run dev


By default Vite runs at:

http://localhost:5173


Make sure the server is running before logging in or using protected features.

4. (Optional) Run Both with concurrently from Root

If you want a single command to start both client and server:

Install concurrently at the root:

npm install --save-dev concurrently


In the root package.json, add:

{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
  }
}


Then from the root:

npm run dev


This will start both:

backend on http://localhost:5000

frontend on http://localhost:5173

🧪 Testing the API (Postman / Thunder Client)

Once the server is running, you can test key endpoints:

Auth:

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/auth/me

Users:

GET /api/v1/users/me

PATCH /api/v1/users/me

POST /api/v1/users/me/avatar

POST /api/v1/users/:id/follow

DELETE /api/v1/users/:id/follow

GET /api/v1/users/:id/followers

GET /api/v1/users/:id/following

GET /api/v1/users/search?q=<query>

Posts:

POST /api/v1/posts (multipart/form-data)

GET /api/v1/feed?page=1&limit=10

Chats:

GET /api/v1/chats

POST /api/v1/chats/start

GET /api/v1/chats/:chatId/messages

POST /api/v1/chats/:chatId/messages

For protected routes, include:

Authorization: Bearer <access_token_from_login>

🧭 Development Approach

This project is built using a vertical-slice flow for each feature:

Contract – define request/response + states

Data layer – Mongoose schemas & indexes

Validation schemas – body/query/params

Service layer – pure business logic

Controller + Middleware + Routes – REST API, auth, roles, error handling

Socket events – when feature needs realtime

Frontend API layer – axios wrappers

Layouts / Routing – ensure page is reachable

Pages + Components – actual UI implementation

Realtime polish – optimistic updates, live indicators

Tests + Logs + Seed – endpoint testing & seed data (WIP)

This keeps each feature (auth, profile, posts, follow, chats, etc.) consistent and easier to reason about.

✅ Status

NexaSpace is a work-in-progress but already supports:

Full auth flow

User profiles & avatar

Posts + feed

Follow system with counts

Basic 1–1 chats

Public & admin routing shell

More features (stories, notifications, admin tools, explore, security extras) are designed and can be implemented on top of this foundation.

