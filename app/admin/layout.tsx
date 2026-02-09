"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.isAdmin) {
            setTimeout(() => setIsAdmin(true), 0);
        } else {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: ShoppingBag },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            LUXE Admin
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                                        ${isActive
                                            ? "bg-pink-50 text-pink-600"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-5 h-5 ${isActive ? "text-pink-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10">
                    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
