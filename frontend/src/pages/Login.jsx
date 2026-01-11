import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            localStorage.removeItem("token");

            const res = await api.post("/auth/login", {
                email: e.target.email.value,
                password: e.target.password.value,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">


            <div className="hidden lg:flex w-1/2 bg-blue-600 relative items-center justify-center">
                <img
                    src="/src/assets/login.png"
                    alt="Building"
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
                <div className="relative z-10 text-black max-w-md px-10 flex flex-col h-48">
                    <h2 className="text-3xl font-bold mb-4">
                        Track expenses smarter
                    </h2>
                    <p className="text-sm opacity-90">
                        Manage income, spending, and budgets in one place with ease.
                    </p>
                </div>
            </div>


            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back 👋
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 mb-6">
                        Sign in to continue to Expense Tracker
                    </p>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-2 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-gray-300 px-2 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <textbutton
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                                    title="Show / hide password"
                                >
                                    👁️
                                </textbutton>
                            </div>
                        </div>


                        <button
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white
                hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Signing in…" : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            Create one
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}
