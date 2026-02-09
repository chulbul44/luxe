"use client";

import { useEffect, useState } from "react";
import {
    ShoppingBag,
    Users,
    TrendingUp,
    DollarSign,
    Box,
    Clock,
    CheckCircle,
    XCircle
} from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5000/api/admin/stats", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { label: "Total Products", value: stats.products, icon: ShoppingBag, color: "bg-blue-500" },
        { label: "Total Users", value: stats.users, icon: Users, color: "bg-purple-500" },
        { label: "Total Orders", value: stats.orders, icon: Box, color: "bg-pink-500" },
        { label: "Revenue", value: "₹0", icon: DollarSign, color: "bg-green-500" },
    ];

    if (loading) return <div>Loading Stats...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${card.color} text-white`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    +12%
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{card.label}</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                {/* Recent Activity Placeholder */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">System updated successfully</p>
                                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Placeholder */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all text-left">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm text-gray-900">Add Product</span>
                        </button>
                        <button className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm text-gray-900">Add User</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
