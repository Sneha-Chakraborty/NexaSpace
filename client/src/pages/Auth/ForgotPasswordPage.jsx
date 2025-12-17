import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout.jsx";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: In Feature 15, call your real API:
    // await authApi.requestPasswordReset(email);
    console.log("Forgot password request for:", email);

    setSubmitted(true);
  };

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto bg-black/60 border border-white/10 rounded-3xl px-8 py-10 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-center text-gray-400 mb-8">
          Enter the email associated with your account. We&apos;ll send you a
          link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-nexablue focus:ring-1 focus:ring-nexablue placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-nexablue text-black font-semibold py-2.5 text-sm hover:bg-blue-400 transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-xs text-center text-green-400">
            If an account exists with that email, you&apos;ll receive a reset
            link shortly.
          </p>
        )}

        <div className="mt-8 text-xs text-center text-gray-400 space-y-2">
          <p>
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-nexablue hover:underline font-medium"
            >
              Back to Login
            </Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-nexablue hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ForgotPasswordPage;
