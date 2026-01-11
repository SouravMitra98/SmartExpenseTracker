import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const res = await api.post('/auth/register', {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
            });

            localStorage.setItem('token', res.data.token);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">


                <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-50 p-12">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-4">
                        Smart Expense Tracker
                    </h2>
                    <p className="text-sm text-indigo-600 mb-8 text-center max-w-xs">
                        Track expenses, analyze spending, and take control of your money.
                    </p>


                    <div className="w-full max-w-sm">
                        <img
                            src="/src/assets/registration.png"
                            alt="Expense tracking illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>


                <div className="p-8 sm:p-12">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create an account
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 mb-6">
                        Start managing your expenses smarter
                    </p>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full name
                            </label>
                            <input
                                name="name"
                                required
                                placeholder="John Doe"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="mt-1 text-xs text-gray-400">
                                Minimum 6 characters
                            </p>
                        </div>


                        <button
                            disabled={loading}
                            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white
              hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Creating account…' : 'Create account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-indigo-600 hover:underline cursor-pointer"
                        >
                            Sign in
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
