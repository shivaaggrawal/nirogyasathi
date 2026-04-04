import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, User, Phone, Activity } from "lucide-react";
import { ImageWithFallback } from "../ImageWithFallback";

// 🔥 Firebase
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

export function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 EMAIL SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // ✅ Set user name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      console.log("User Created:", userCredential.user);

      // redirect after signup
      navigate("/");

    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // 🔥 GOOGLE SIGNUP
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Google Sign-in failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block relative bg-linear-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691461516-7e716e0ca135"
                  alt="Healthcare"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Join HealthAI Today</h2>
              <p className="text-muted-foreground">
                Get personalized health insights and connect with doctors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="bg-linear-to-br from-primary to-cyan-600 p-3 rounded-xl">
                <Activity className="size-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Start your journey to better health
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border"
            />

            {/* Submit */}
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl">
              Create Account
            </button>

          </form>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleSignup}
            className="w-full py-3 border rounded-xl font-medium"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}