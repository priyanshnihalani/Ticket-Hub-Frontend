import { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Services/API/UserAPI.js";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Minimum 3 characters required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter 10 digit number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await createUser({ ...formData, role: "user" });
      if (res.data?.code === 201) {
        localStorage.setItem("authDetail", JSON.stringify(res.data.data));
        navigate("/user/dashboard");
        alert(res.data?.description || "Something went wrong");
      }

    } catch (error) {
      console.error("Registration failed", error);
      alert(error.response.data.description || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 sm:p-8">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.66553 11.9951C3.72595 11.9951 4.74294 12.4163 5.49278 13.1661C6.24261 13.916 6.66386 14.933 6.66386 15.9934C6.66386 17.0538 6.24261 18.0708 5.49278 18.8206C4.74294 19.5705 3.72595 19.9917 2.66553 19.9917V22.6573C2.66553 23.3642 2.94636 24.0422 3.44625 24.5421C3.94614 25.042 4.62413 25.3228 5.33108 25.3228H26.6555C27.3625 25.3228 28.0405 25.042 28.5404 24.5421C29.0403 24.0422 29.3211 23.3642 29.3211 22.6573V19.9917C28.2607 19.9917 27.2437 19.5705 26.4938 18.8206C25.744 18.0708 25.3228 17.0538 25.3228 15.9934C25.3228 14.933 25.744 13.916 26.4938 13.1661C27.2437 12.4163 28.2607 11.9951 29.3211 11.9951V9.3295C29.3211 8.62255 29.0403 7.94455 28.5404 7.44466C28.0405 6.94477 27.3625 6.66394 26.6555 6.66394H5.33108C4.62413 6.66394 3.94614 6.94477 3.44625 7.44466C2.94636 7.94455 2.66553 8.62255 2.66553 9.3295V11.9951Z" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.3261 6.66394V9.3295" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.3261 22.6572V25.3228" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.3261 14.6605V17.3261" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">Register</h1>
        <p className="text-center text-gray-500 mt-1">
          Create an account to continue
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-4 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 bg-gray-100 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 bg-gray-100 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">Mobile Number</label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-4 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 bg-gray-100 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-4 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 bg-gray-100 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          You already have an account?{" "}
          <button
            className="text-orange-500 font-medium"
            onClick={() => navigate('/login')}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
