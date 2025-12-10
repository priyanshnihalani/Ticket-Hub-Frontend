import { useState } from "react";
import { User, ShieldCheck, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../Services/API/UserAPI";
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
            const res = await UserApi.loginUser({ ...form, role });
            const apiCode = res?.code;
            if (apiCode === 200) {
                localStorage.setItem("authDetail-tickethub", JSON.stringify(res.data));
                navigate("/");
            }

        } catch (error) {
            console.error("Login failed", error.response.data.description);
            alert(error.response.data.description);
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
                            <img src="/logo.svg" />
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