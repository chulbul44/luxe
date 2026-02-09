"use client";

import { useState, useEffect } from "react";
import { Copy, Clock, Sparkles } from "lucide-react";

const COUPONS = [
    { code: "WOMEN30", discount: "30% OFF", category: "Women's Collection", description: "Get flat 30% off on all women's apparel." },
    { code: "SAREE25", discount: "25% OFF", category: "Ethnic Wear", description: "Special discount on our premium silk sarees." },
    { code: "SUMMER40", discount: "40% OFF", category: "Summer Essentials", description: "Beat the heat with our cool summer collection." },
    { code: "PARTY50", discount: "50% OFF", category: "Party Wear", description: "Shine bright with half price on party dresses." },
    { code: "ACCESS20", discount: "20% OFF", category: "Accessories", description: "Complete your look with stylish accessories." },
    { code: "FIRST15", discount: "15% OFF", category: "New Arrivals", description: "Welcome bonus for our newest collection." },
];

export default function DailyCoupon() {
    const [coupon, setCoupon] = useState(COUPONS[0]);
    const [timeLeft, setTimeLeft] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Select coupon based on the day of the month
        const dayOfMonth = new Date().getDate();
        const index = dayOfMonth % COUPONS.length;
        setTimeout(() => setCoupon(COUPONS[index]), 0);

        const timer = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow.getTime() - now.getTime();

            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-12 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-1 shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="bg-white/10 backdrop-blur-sm rounded-[20px] p-5 sm:p-10 text-white relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">

                        {/* Decoration */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-64 sm:h-64 bg-pink-500/30 rounded-full blur-3xl"></div>

                        {/* Left Content */}
                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-lg">
                            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
                                <Sparkles className="w-3 h-3" />
                                Today&apos;s Special Deal
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                {coupon.discount} <br />
                                <span className="text-xl sm:text-2xl font-medium text-pink-100 block mt-2">
                                    on {coupon.category}
                                </span>
                            </h2>
                            <p className="text-pink-100 text-sm sm:text-base opacity-90">
                                {coupon.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium bg-black/20 px-4 py-2 rounded-lg mt-2">
                                <Clock className="w-4 h-4 animate-pulse" />
                                <span>Expires in: {timeLeft}</span>
                            </div>
                        </div>

                        {/* Right Content - Coupon Card */}
                        <div className="relative z-10 bg-white text-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-sm border-2 border-dashed border-gray-300">
                            <div className="text-center space-y-4">
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Coupon Code</p>
                                <div className="bg-gray-100 py-4 rounded-xl border border-gray-200">
                                    <code className="text-3xl font-mono font-bold tracking-widest text-indigo-600">
                                        {coupon.code}
                                    </code>
                                </div>

                                <button
                                    onClick={copyToClipboard}
                                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-900 text-white hover:bg-gray-800"
                                        }`}
                                >
                                    {copied ? (
                                        <>Copied!</>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy Code
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-gray-400">
                                    *Terms and conditions apply. Valid until midnight.
                                </p>
                            </div>

                            {/* Circles for coupon effect */}
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#6366f1] rounded-full"></div>
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ec4899] rounded-full"></div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
