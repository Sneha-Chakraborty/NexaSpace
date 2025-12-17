# NexaSpace – Client (React + Vite + Tailwind)

This is the **frontend** of the NexaSpace social media application.

Built with:

- **React 18** (SPA, React Router)
- **Vite** (dev server & bundler)
- **Tailwind CSS** (utility-first styling)
- **Axios** (HTTP client)
- **Context API** for auth, UI & socket state
- **Socket.io Client** (for realtime chat & notifications – WIP)

---

## ✨ Features (Client-Side)

Current & planned frontend features for NexaSpace:

- **Public pages**
  - Landing page (`/`)
  - About (`/about`)
  - Help (`/help`)

- **Authentication**
  - Register (`/register`)
  - Login (`/login`)
  - Basic forgot-password page (`/forgot-password`) – placeholder UI
  - JWT-based auth integrated with backend

- **App Shell (logged-in SPA)**
  - `AppLayout` with Top Navbar, search bar, profile menu
  - Dashboard layout: left stats, center feed, right quick-nav
  - Protected routes for logged-in users

- **User Profile**
  - My Profile (`/profile/me`)
  - Edit Profile (`/profile/edit`)
  - Followers (`/profile/me/followers`)
  - Following (`/profile/me/following`)
  - Avatar/profile picture upload (via backend)

- **Posts & Feed**
  - Create Post (`/posts/create`)
  - Home feed on `/dashboard`
  - Text + optional media (image)
  - Post cards with author info, timestamp, basic actions

- **Follow System**
  - Follow/unfollow users from post cards & profiles
  - Followers/Following counts in dashboard left panel

- **Chats (1–1 messaging – WIP)**
  - Chats list (`/chats`)
  - Chat room (`/chats/:chatId`)
  - Message window & input box
  - Realtime integration via Socket.io (work-in-progress)

- **Admin (WIP)**
  - Admin Dashboard (`/admin`) via `AdminLayout` & `AdminRoute`

---

1. Install dependencies

From the client directory:

cd client
npm install

2. Environment variables

Create a .env file in client/ (same level as package.json) with:

VITE_API_BASE_URL=http://localhost:5000/api/v1


This is used by axiosInstance.js / endpoints.js to talk to the backend.

Adjust the URL if your server runs on another host/port.

3. Run the dev server
npm run dev


By default Vite runs on http://localhost:5173/.

Make sure the backend server is running (from /server) so login, posts, etc. work.

