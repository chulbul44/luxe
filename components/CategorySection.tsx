import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    { name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e55041d04f?q=80&w=2574&auto=format&fit=crop", count: "120+ Items" },
    { name: "Kurtis", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2670&auto=format&fit=crop", count: "85+ Items" },
    { name: "Western Wear", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop", count: "200+ Items" },
    { name: "Party Wear", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2548&auto=format&fit=crop", count: "50+ Items" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2000&auto=format&fit=crop", count: "150+ Items" },
];

export default function CategorySection() {
    return (
        <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Shop by Category
                    </h2>
                    <Link href="/categories" className="flex items-center gap-2 text-pink-600 font-medium hover:text-pink-700 transition-colors">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {CATEGORIES.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={`/category/${cat.name.toLowerCase()}`}
                            className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${cat.image}')` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-lg font-bold mb-1">{cat.name}</h3>
                                <p className="text-xs text-gray-200 group-hover:text-white transition-colors">{cat.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
