import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] sm:h-[600px] lg:h-[700px] overflow-hidden">
            {/* Background Image Placeholder - In real app, use next/image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 via-gray-50/50 to-transparent"></div>
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className="max-w-xl space-y-6 sm:space-y-8 animate-fade-in-up text-center sm:text-left">
                    <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 text-sm font-semibold tracking-wide rounded-full mb-2">
                        Spring Collection 2026
                    </span>

                    <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-[1.1]">
                        Redefine Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            Everyday Style
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        Discover the latest trends in sustainable fashion. curated for the modern woman who values comfort and elegance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
                        <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1">
                            Shop Now
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="px-8 py-4 rounded-full font-medium border border-gray-300 text-gray-700 bg-white/50 backdrop-blur-sm transition-all hover:bg-white hover:border-gray-400">
                            View Lookbook
                        </button>
                    </div>
                </div>

                {/* Floating Stats or Badge */}
                <div className="absolute bottom-10 right-4 sm:right-10 flex gap-6 sm:gap-12 animate-fade-in glass-card p-6 rounded-2xl hidden md:flex bg-white/80 backdrop-blur shadow-lg">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">2k+</p>
                        <p className="text-sm text-gray-500">New Arrivals</p>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div>
                        <p className="text-3xl font-bold text-gray-900">15k+</p>
                        <p className="text-sm text-gray-500">Happy Customers</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
