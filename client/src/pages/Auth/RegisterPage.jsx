import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout.jsx";
import { registerRequest } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password
      };
      const res = await registerRequest(payload);
      const { user, token } = res.data.data;

      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-md mx-auto bg-black/70 border border-white/20 rounded-[32px] px-8 py-10">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Register / Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Name (optional)</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-1 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-md bg-nexablue text-black font-semibold py-2.5 text-sm hover:bg-blue-400 disabled:opacity-60"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-xs text-center text-gray-300">
          Already a registered user?{" "}
          <Link to="/login" className="text-nexablue hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterPage;
