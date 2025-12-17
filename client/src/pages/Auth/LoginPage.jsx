// client/src/pages/Auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authError, authLoading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }

    const ok = await login({ email, password });

    if (ok) {
      navigate("/dashboard");
    }
  };

  const errorMessage = localError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-nexablack text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black/60 border border-white/15 rounded-3xl px-8 py-10 space-y-6"
      >
        <h1 className="text-center text-2xl font-semibold mb-4">
          Register / Login
        </h1>

        {errorMessage && (
          <p className="text-red-400 text-sm text-center mb-2">
            {errorMessage}
          </p>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-black border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl bg-black border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          disabled={authLoading}
          className="w-full mt-4 rounded-xl bg-sky-500 hover:bg-sky-600 py-2 font-semibold transition-colors disabled:opacity-60"
        >
          {authLoading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-xs text-center mt-4 text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-sky-400 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
