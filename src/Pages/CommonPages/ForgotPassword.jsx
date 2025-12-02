import { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    // ================= VALIDATION LOGIC =================
    const validateForm = () => {
        let tempErrors = {};

        if (!form.newPassword) {
            tempErrors.newPassword = "New password is required";
        } else if (form.newPassword.length < 6) {
            tempErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!form.confirmPassword) {
            tempErrors.confirmPassword = "Confirm password is required";
        } else if (form.newPassword !== form.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(tempErrors);

        // returns true if no errors
        return Object.keys(tempErrors).length === 0;
    };

    // ================= HANDLE SUBMIT =================
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return
        console.log("✅ Password Updated:", form);
        alert("Password updated successfully!");
        navigate('/login')
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm text-center">

                {/* Icon */}
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

                <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
                <p className="text-gray-500 text-sm mt-1">Create New Password</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">

                    {/* New Password */}
                    <div>
                        <label className="text-gray-600 text-sm block mb-1">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="••••••••"
                                value={form.newPassword}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-full border focus:outline-none ${errors.newPassword ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-600 text-sm block mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-full border focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );

};

export default ForgotPassword;
