"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldAlert } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "New Arrivals", href: "/new" },
    { name: "Offers", href: "/offers", special: true },
    { name: "Daily Coupons", href: "/coupons", special: true },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { cartCount, setIsCartOpen, isMounted } = useCart();

    useEffect(() => {
        if (!isMounted) return;
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.isAdmin) {
            setTimeout(() => setIsAdmin(true), 0);
        }
    }, [isMounted]);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-2 cursor-pointer">
                        <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Luxe.
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-pink-500 ${link.special ? "text-pink-600 hover:text-pink-700" : "text-gray-700"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="flex items-center gap-1.5 text-sm font-bold text-gray-900 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 hover:bg-pink-100 transition-all"
                            >
                                <ShieldAlert className="w-4 h-4 text-pink-600" />
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    {/* Right Section: Search & Icons */}
                    <div className="flex items-center gap-4 sm:gap-6">

                        {/* Search Bar (Hidden on mobile) */}
                        <div className="hidden md:flex items-center bg-gray-50 px-3 py-2 rounded-full w-64 border border-transparent focus-within:border-pink-200 transition-all">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="ml-2 bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-gray-400"
                            />
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-4 text-gray-600">
                            <button className="hover:text-pink-500 transition-colors relative group">
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full hidden group-hover:block animate-ping" />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 text-gray-600 hover:text-pink-600 transition-colors relative"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {isMounted && cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Link href="/profile" className="hidden sm:block hover:text-pink-500 transition-colors">
                                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-pink-500 transition-colors p-2"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <span className="text-xl font-bold text-gray-800">Menu</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-5">
                        {/* Mobile Search */}
                        <div className="flex items-center bg-gray-50 px-3 py-3 rounded-xl mb-6 border border-gray-100">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="ml-2 bg-transparent outline-none text-sm text-gray-700 w-full"
                            />
                        </div>

                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${link.special
                                        ? "bg-pink-50 text-pink-600 hover:bg-pink-100"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-pink-500"
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center justify-between">
                                        {link.name}
                                    </div>
                                </Link>
                            ))}
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl font-bold border border-pink-100 mt-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <ShieldAlert className="w-5 h-5 text-pink-600" />
                                    <span className="font-bold">Admin Panel</span>
                                </Link>
                            )}
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                                <User className="w-5 h-5" />
                                <span className="font-medium">My Profile</span>
                            </Link>
                            <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                                <Heart className="w-5 h-5" />
                                <span className="font-medium">Wishlist</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
