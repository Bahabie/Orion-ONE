"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState<Array<{ left: number; top: number; opacity: number; duration: number }>>([]);

  // Generate stars on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t.login.errorInvalid);
        setIsLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(t.login.errorGeneral);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#09090b",
      }}
    >
      {/* Animated background stars - monochrome */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: "#a1a1aa",
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Auth Card - Monochrome Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-md rounded-2xl border px-8 py-10 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(24, 24, 27, 0.5)",
          borderColor: "#27272a",
        }}
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex items-baseline justify-center gap-2"
          >
            <span
              className="text-3xl font-bold tracking-tight"
              style={{ color: "#f4f4f5" }}
            >
              ORION
            </span>
            <span
              className="text-3xl font-light tracking-[0.25em]"
              style={{ color: "#a1a1aa" }}
            >
              ONE
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg font-semibold tracking-tight"
            style={{ color: "#f4f4f5" }}
          >
            Welcome to Orion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-sm"
            style={{ color: "#71717a" }}
          >
            Sign In
          </motion.p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
              style={{ color: "#d4d4d8" }}
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "rgba(24, 24, 27, 0.5)",
                borderColor: "#3f3f46",
                color: "#f4f4f5",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#71717a";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#3f3f46";
              }}
              placeholder="admin@orion.one"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
              style={{ color: "#d4d4d8" }}
            >
              Your Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "rgba(24, 24, 27, 0.5)",
                borderColor: "#3f3f46",
                color: "#f4f4f5",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#71717a";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#3f3f46";
              }}
              placeholder="••••••••"
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border px-4 py-3 text-sm font-medium"
              style={{
                backgroundColor: "rgba(127, 29, 29, 0.2)",
                borderColor: "rgba(185, 28, 28, 0.3)",
                color: "#fca5a5",
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50"
            style={{
              backgroundColor: "#fafafa",
              color: "#09090b",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "#e4e4e7";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fafafa";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isLoading ? t.login.submitting : t.login.submitButton}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-sm" style={{ color: "#71717a" }}>
            New user?{" "}
            <a
              href="#"
              className="font-semibold transition-colors duration-200"
              style={{ color: "#d4d4d8" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f4f4f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#d4d4d8";
              }}
            >
              Request access
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
