// client/src/app/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

// Public pages
import LandingPage from "../../pages/Landing/LandingPage.jsx";
import AboutPage from "../../pages/Landing/AboutPage.jsx";
import HelpPage from "../../pages/Landing/HelpPage.jsx";

import RegisterPage from "../../pages/Auth/RegisterPage.jsx";
import LoginPage from "../../pages/Auth/LoginPage.jsx";
import ForgotPasswordPage from "../../pages/Auth/ForgotPasswordPage.jsx";

// Authenticated user pages
import DashboardPage from "../../pages/Dashboard/DashboardPage.jsx";
import MyProfilePage from "../../pages/Profile/MyProfilePage.jsx";
import EditProfilePage from "../../pages/Profile/EditProfilePage.jsx";
import CreatePostPage from "../../pages/Posts/CreatePostPage.jsx";

// Admin pages
import AdminDashboardPage from "../../pages/Admin/AdminDashboardPage.jsx";

// Misc
import NotFoundPage from "../../pages/NotFound/NotFoundPage.jsx";

// Layouts
import AppLayout from "../../layouts/AppLayout.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";

//Following and Followers Pages
import FollowersPage from "../../pages/Profile/FollowersPage.jsx";
import FollowingPage from "../../pages/Profile/FollowingPage.jsx";

import ChatsPage from "../../pages/Chats/ChatsPage.jsx";
import ChatRoomPage from "../../pages/Chats/ChatRoomPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (no auth) */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Authenticated user routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />

        <Route
          path="/profile/me"
          element={
            <AppLayout>
              <MyProfilePage />
            </AppLayout>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <AppLayout>
              <EditProfilePage />
            </AppLayout>
          }
        />

        <Route
          path="/posts/create"
          element={
            <AppLayout>
              <CreatePostPage />
            </AppLayout>
          }
        />
        <Route
          path="/profile/me/followers"
          element={
            <AppLayout>
              <FollowersPage />
            </AppLayout>
          }
        />

        <Route
          path="/profile/me/following"
          element={
            <AppLayout>
              <FollowingPage />
            </AppLayout>
          }
        />
        <Route 
          path="/chats" 
          element={
            <ChatsPage />
          } 
        />
        <Route 
          path="/chats/:chatId" 
          element={
            <ChatRoomPage />
          } 
        />

      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          }
        />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
