"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetStep, setResetStep] = useState<"email" | "reset">("email");
    const [forgotEmail, setForgotEmail] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const openForgotPassword = () => {
        setShowForgotPassword(true);
        setResetStep("email");
        setForgotEmail(formData.email || "");
        setResetToken("");
        setNewPassword("");
    };

    const closeForgotPassword = () => {
        setShowForgotPassword(false);
        setResetLoading(false);
    };

    const handleRequestResetToken = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setResetStep("reset");
                alert(
                    `Reset token generated: ${data.resetToken}\nUse this token in next step.\n(Production me ye token email pe jayega.)`
                );
            } else {
                alert("Forgot Password Failed: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Error: Could not connect to server.");
        } finally {
            setResetLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: resetToken.trim(),
                    newPassword,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                alert("Password reset successful! Please login with your new password.");
                closeForgotPassword();
            } else {
                alert("Reset Password Failed: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Error: Could not connect to server.");
        } finally {
            setResetLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Store token and user info in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin
                }));

                alert("Login Successful! Welcome back, " + data.name);

                // Redirect to admin dashboard if admin, otherwise home
                setTimeout(() => {
                    if (data.isAdmin) {
                        window.location.href = "/admin";
                    } else {
                        window.location.href = "/";
                    }
                }, 1000);
            } else {
                alert("Login Failed: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Error: Could not connect to server. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-soft-bg relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50">

                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Store
                        </Link>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Please enter your details to sign in
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={openForgotPassword}
                                    className="text-xs text-pink-500 hover:text-pink-600 font-medium"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-pink-600 font-bold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

            {showForgotPassword && (
                <div className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Forgot Password</h2>
                            <button
                                type="button"
                                onClick={closeForgotPassword}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Close
                            </button>
                        </div>

                        {resetStep === "email" ? (
                            <form onSubmit={handleRequestResetToken} className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Enter your account email. We will generate a reset token.
                                </p>
                                <input
                                    type="email"
                                    required
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    placeholder="hello@example.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={resetLoading}
                                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
                                >
                                    {resetLoading ? "Generating token..." : "Generate Reset Token"}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Enter reset token and your new password.
                                </p>
                                <input
                                    type="text"
                                    required
                                    value={resetToken}
                                    onChange={(e) => setResetToken(e.target.value)}
                                    placeholder="Reset token"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                />
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New password"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                />
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setResetStep("email")}
                                        className="w-1/2 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={resetLoading}
                                        className="w-1/2 bg-gray-900 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
                                    >
                                        {resetLoading ? "Resetting..." : "Reset Password"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
