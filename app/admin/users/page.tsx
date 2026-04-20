"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Mail, Search, Shield, Trash2, UserRound } from "lucide-react";

type AdminUser = {
    _id: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
    createdAt?: string;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [currentUserId, setCurrentUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState("");
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Admin login required.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setUsers(data.users || []);
                setError("");
            } else {
                setError(data.message || "Unable to fetch users.");
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const sessionUser = localStorage.getItem("user");
        if (sessionUser) {
            try {
                const parsed = JSON.parse(sessionUser);
                setCurrentUserId(parsed?._id || "");
            } catch (err) {
                console.error("Invalid session user:", err);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return users;
        return users.filter((user) =>
            `${user.name || ""} ${user.email || ""}`.toLowerCase().includes(query)
        );
    }, [users, searchTerm]);

    const updateRole = async (userId: string, isAdmin: boolean) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setActionLoading(`role-${userId}`);
        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ isAdmin }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setUsers((prev) =>
                    prev.map((u) => (u._id === userId ? { ...u, isAdmin } : u))
                );
                setError("");
            } else {
                setError(data.message || "Unable to update role.");
            }
        } catch (err) {
            console.error("Error updating role:", err);
            setError("Could not connect to server.");
        } finally {
            setActionLoading("");
        }
    };

    const deleteUser = async (userId: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        if (!confirm("Are you sure you want to delete this user account?")) return;

        setActionLoading(`delete-${userId}`);
        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setUsers((prev) => prev.filter((u) => u._id !== userId));
                setError("");
            } else {
                setError(data.message || "Unable to delete user.");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("Could not connect to server.");
        } finally {
            setActionLoading("");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                <p className="text-sm text-gray-500">
                    All registered user accounts are visible to admin here.
                </p>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Total Users: <span className="font-bold text-gray-900">{filteredUsers.length}</span>
                    </p>
                    <div className="relative w-64">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or email"
                            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-pink-400"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-6 text-sm text-gray-500">Loading users...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-6 text-sm text-gray-500">No users found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Created</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="inline-flex items-center gap-2">
                                                <UserRound className="w-4 h-4 text-gray-400" />
                                                {user.name || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <div className="inline-flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {user.email || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${user.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                                                <Shield className="w-3 h-3" />
                                                {user.isAdmin ? "Admin" : "Customer"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateRole(user._id, !user.isAdmin)}
                                                    disabled={actionLoading === `role-${user._id}` || currentUserId === user._id}
                                                    className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    {actionLoading === `role-${user._id}`
                                                        ? "Updating..."
                                                        : user.isAdmin
                                                            ? "Remove Admin"
                                                            : "Make Admin"}
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    disabled={actionLoading === `delete-${user._id}` || currentUserId === user._id}
                                                    className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    {actionLoading === `delete-${user._id}` ? "Deleting..." : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
