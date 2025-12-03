import { useState } from "react";
import { User, ShieldCheck, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/API/UserAPI.js";
const Login = () => {
    const [role, setRole] = useState("user");
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        try {
            const res = await loginUser({ ...form, role });
            const apiCode = res?.data?.code;
            if (apiCode === 200) {
                localStorage.setItem("authDetail", JSON.stringify(res.data.data));
                navigate("/");
            }

        } catch (error) {
            console.error("Login failed", error.response.data.description);
            alert( error.response.data.description);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm text-center">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <div className="bg-orange-500 p-3 rounded-xl">
                        <span className="text-white font-bold text-lg">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66553 11.9951C3.72595 11.9951 4.74294 12.4163 5.49278 13.1661C6.24261 13.916 6.66386 14.933 6.66386 15.9934C6.66386 17.0538 6.24261 18.0708 5.49278 18.8206C4.74294 19.5705 3.72595 19.9917 2.66553 19.9917V22.6573C2.66553 23.3642 2.94636 24.0422 3.44625 24.5421C3.94614 25.042 4.62413 25.3228 5.33108 25.3228H26.6555C27.3625 25.3228 28.0405 25.042 28.5404 24.5421C29.0403 24.0422 29.3211 23.3642 29.3211 22.6573V19.9917C28.2607 19.9917 27.2437 19.5705 26.4938 18.8206C25.744 18.0708 25.3228 17.0538 25.3228 15.9934C25.3228 14.933 25.744 13.916 26.4938 13.1661C27.2437 12.4163 28.2607 11.9951 29.3211 11.9951V9.3295C29.3211 8.62255 29.0403 7.94455 28.5404 7.44466C28.0405 6.94477 27.3625 6.66394 26.6555 6.66394H5.33108C4.62413 6.66394 3.94614 6.94477 3.44625 7.44466C2.94636 7.94455 2.66553 8.62255 2.66553 9.3295V11.9951Z" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.3261 6.66394V9.3295" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.3261 22.6572V25.3228" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.3261 14.6605V17.3261" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                <p className="text-gray-500 mt-1 text-sm">Sign in to continue</p>

                {/* Role Toggle */}
                <div className="mt-5 bg-gray-100 rounded-full p-1.5 flex">
                    <button
                        onClick={() => setRole("user")}
                        className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-full transition font-medium text-sm ${role === "user" ? "bg-white shadow text-gray-900" : "text-gray-400"
                            }`}
                    >
                        <User size={16} /> User
                    </button>
                    <button
                        onClick={() => setRole("admin")}
                        className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-full transition font-medium text-sm ${role === "admin" ? "bg-white shadow text-gray-900" : "text-gray-400"
                            }`}
                    >
                        <ShieldCheck size={16} /> Admin
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 text-left">

                    {/* Email */}
                    <label className="text-xs font-medium text-gray-700">Email</label>
                    <div className="relative mt-1">
                        <Mail className="absolute left-4 top-4 text-gray-400" size={16} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

                    {/* Password */}
                    <label className="text-xs font-medium text-gray-700 mt-3 block">Password</label>
                    <div className="relative mt-1">
                        <Lock className="absolute left-4 top-4 text-gray-400" size={16} />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                    {/* Forgot password */}
                    {/* {role === "user" && (
                        <div className="text-right mt-2">
                            <button
                                onClick={() => navigate('/forgot-password')}
                                type="button"
                                className="text-orange-500 text-xs hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )} */}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 bg-orange-500 text-white py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
                    >
                        {isLoading ? "Signing In..." : role === "admin" ? "Sign In as admin" : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                {role === "user" && (
                    <p className="mt-4 text-gray-600 text-xs text-center">
                        You don’t have an Account?{" "}
                        <button onClick={() => navigate('/register')} className="text-orange-500 hover:underline">
                            Sign Up here
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;