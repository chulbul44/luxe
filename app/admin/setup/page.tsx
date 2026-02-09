"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminSetup() {
    const [status, setStatus] = useState("");

    const makeMeAdmin = () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user && user._id) {
            user.isAdmin = true;
            localStorage.setItem("user", JSON.stringify(user));
            setStatus("Success! You are now an Admin in your local session. Please refresh and try accessing /admin.");
        } else {
            setStatus("Please login first to promote yourself.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Setup (Testing Only)</h1>
                <p className="text-gray-500 text-sm">Use this button to promote your current session to Admin status for testing the panel.</p>
                <button
                    onClick={makeMeAdmin}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold transition-all"
                >
                    Promote Me to Admin
                </button>
                {status && <p className="text-green-600 font-medium text-sm">{status}</p>}
            </div>
        </main>
    );
}
