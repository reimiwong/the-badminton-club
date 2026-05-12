import type { FC } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const { login, isAuthenticated } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    throw new Error("VITE_API_URL is not defined");
  }

  // ✅ ALL HOOKS MUST BE BEFORE ANY RETURN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === "modal-container") onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      login(
        { username: data.user.name, email: data.user.email },
        data.accessToken,
      );

      setLoading(false);
      onClose();
    } catch {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  // ✅ SAFE RETURN AFTER HOOKS
  if (!isOpen || isAuthenticated) return null;

  return (
    <div
      id="modal-container"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClickOutside}
    >
      <div
        className={`relative max-w-lg w-full mx-4 bg-background rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center gap-10
        transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 transition cursor-pointer"
          aria-label="Close modal"
        >
          <img
            src="/images/icons/gray-x-icon.svg"
            alt="Close"
            className="w-4 h-4"
          />
        </button>

        {/* ICON */}
        <div className="w-20 rounded-3xl bg-primary p-4 shadow-[0_12px_35px_rgba(0,158,96,0.28)] flex justify-center hover:-translate-y-1 transition-transform duration-300">
          <img
            src="/images/icons/lock-icon.svg"
            alt=""
            aria-hidden="true"
            className="w-10 h-10"
          />
        </div>

        {/* TEXT */}
        <div className="text-center space-y-4">
          <h1 className="h1">Sign in to book</h1>
          <p className="text-body-lg text-muted max-w-sm mx-auto">
            Access your booking dashboard, manage reservations, and reserve court time.
          </p>
        </div>

        {/* FORM */}
        <form
          className="w-full rounded-3xl bg-surface border border-border p-6 sm:p-8 flex flex-col gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)] transition-shadow duration-300"
          onSubmit={handleSubmit}
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="label text-text">Email Address</label>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200">
              <img
                src="/images/icons/login-mail-icon.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 opacity-60"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-body placeholder:text-muted"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="label text-text">Password</label>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200">
              <img
                src="/images/icons/login-lock-icon.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 opacity-60"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-body placeholder:text-muted"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-[0_10px_25px_rgba(0,158,96,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,158,96,0.35)] active:scale-[0.985] transition-all duration-200 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
            <img
              src="/images/icons/right-arrow-icon.svg"
              alt=""
              aria-hidden="true"
              className="w-4 h-4 transition-transform duration-200"
            />
          </button>
        </form>

        {/* FOOTER */}
        <div className="flex flex-col items-center gap-2 text-center text-sm">
          <span className="text-muted">Don't have an account?</span>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary font-medium transition-all duration-200 hover:bg-primary/15 hover:-translate-y-0.5"
          >
            <img
              src="/images/icons/login-person-icon.svg"
              alt=""
              aria-hidden="true"
              className="w-4 h-4"
            />
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;