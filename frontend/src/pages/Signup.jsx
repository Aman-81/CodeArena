import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../authSlice";
import { useNavigate } from "react-router";

// ✅ Schema (lastName removed)
const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum 3 characters required"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Animations
const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  // ✅ Strong password check
  const checkPasswordStrength = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const onSubmit = async (data) => {
    if (!checkPasswordStrength(data.password)) {
      setPasswordError(
        "⚠️ Password is weak. Use uppercase, lowercase, number & special character."
      );
      return;
    }
    setPasswordError("");

    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/"); // ✅ redirect after success
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100 p-4 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 z-0 bg-radial-gradient"></div>

      {/* Animated background circles */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse-slow"
        initial={{ y: 0, opacity: 0.2 }}
        animate={{ y: [0, 25, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl animate-pulse-slow"
        initial={{ y: 0, opacity: 0.2 }}
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/10 p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          {/* Your logo instead of Sparkles icon */}
          <div className="inline-flex p-3 rounded-full bg-white/10 text-white mb-4">
            <img 
              src="/src/images/Code.png" 
              alt="CodeArena Logo" 
              className="w-16 h-14 brightness-110 contrast-110" 
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Join the CodeArena
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create an account to unlock your potential.
          </p>
        </div>

        {/* Form */}
        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* First Name */}
          <motion.div variants={inputVariants} className="relative group">
            <label
              htmlFor="firstName"
              className="absolute -top-3 left-4 text-xs font-medium text-gray-400 bg-gray-950 px-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className={`w-full bg-gray-800/50 text-gray-50 border border-gray-700 rounded-xl px-4 py-3 transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 ${
                errors.firstName ? "border-red-500 focus:ring-red-500/50" : ""
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div variants={inputVariants} className="relative group">
            <label
              htmlFor="emailId"
              className="absolute -top-3 left-4 text-xs font-medium text-gray-400 bg-gray-950 px-1"
            >
              Email
            </label>
            <input
              id="emailId"
              type="email"
              placeholder="john@example.com"
              className={`w-full bg-gray-800/50 text-gray-50 border border-gray-700 rounded-xl px-4 py-3 transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 ${
                errors.emailId ? "border-red-500 focus:ring-red-500/50" : ""
              }`}
              {...register("emailId")}
            />
            {errors.emailId && (
              <p className="mt-1 text-xs text-red-400">
                {errors.emailId.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div variants={inputVariants} className="relative group">
            <label
              htmlFor="password"
              className="absolute -top-3 left-4 text-xs font-medium text-gray-400 bg-gray-950 px-1"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full bg-gray-800/50 text-gray-50 border border-gray-700 rounded-xl px-4 py-3 pr-12 transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 ${
                errors.password || passwordError
                  ? "border-red-500 focus:ring-red-500/50"
                  : ""
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
            {passwordError && (
              <p className="mt-1 text-xs text-red-400">{passwordError}</p>
            )}
          </motion.div>

          {/* Submit */}
          <motion.button
            variants={inputVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 0px 20px rgba(59,130,246,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-xl py-3 shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Enter the Arena
          </motion.button>
        </motion.form>

        {/* Already have an account */}
        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Login
          </a>
        </p>
      </motion.div>

      {/* Custom animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }
        .bg-radial-gradient {
          background-image: radial-gradient(circle at top left, #292a40, #000000, #292a40);
        }
      `}</style>
    </div>
  );
}