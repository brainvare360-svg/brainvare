import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where they came from, or /admin by default
    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/3 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img
                        src="/logo.png"
                        alt="Brainvare"
                        className="h-8 mx-auto mb-4 object-contain"
                    />
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-500 mt-2 text-sm">Sign in to manage your website</p>
                </div>

                {/* Login Card */}
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                                <span className="text-red-400 text-sm">{error}</span>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-gray-400 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    id="login-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@brainvare.com"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-sm"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="login-password" className="block text-sm font-medium text-gray-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-sm"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    Protected area. Authorized access only.
                </p>
            </div>
        </div>
    );
};

export default Login;
