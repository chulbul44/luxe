"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronDown, Filter } from "lucide-react";
import { Product } from "@/types";
import { useEffect, useMemo, useState } from "react";

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest First"];
const DRESS_KEYWORDS = ["dress", "gown", "one piece", "maxi", "midi"];
const FALLBACK_DRESSES: Product[] = [
    {
        _id: "1",
        name: "Floral Summer Dress",
        price: 2499,
        originalPrice: 4999,
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        category: "Women",
        description: "Lightweight floral dress for casual outings.",
        tag: "Best Seller",
    },
    {
        _id: "2",
        name: "Elegant Evening Gown",
        price: 5999,
        originalPrice: 8999,
        discount: "33% OFF",
        image: "https://images.unsplash.com/photo-1529139574466-a302d2753a90?w=800&q=80",
        category: "Women",
        description: "Premium evening gown for formal events.",
        tag: "Premium",
    },
    {
        _id: "6",
        name: "Boho Chic Dress",
        price: 1799,
        originalPrice: 2499,
        discount: "28% OFF",
        image: "https://images.unsplash.com/photo-1564583630748-0d086c350caa?w=800&q=80",
        category: "Women",
        description: "Comfortable boho style dress for daily wear.",
        tag: "New",
    },
];

export default function WomenDressesPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState("Featured");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                if (!res.ok || !data.success) {
                    setError(data.message || "Unable to load dresses.");
                    return;
                }

                const womenProducts = data.products.filter((p: Product) => {
                    const text = `${p.name} ${p.category} ${p.description || ""} ${p.tag || ""}`.toLowerCase();
                    return text.includes("women") || p.category === "Women";
                });

                const dresses = womenProducts.filter((p: Product) => {
                    const text = `${p.name} ${p.category} ${p.description || ""} ${p.tag || ""}`.toLowerCase();
                    return DRESS_KEYWORDS.some((keyword) => text.includes(keyword));
                });

                setProducts(dresses);
                setError("");
            } catch (err) {
                console.error("Error fetching dresses:", err);
                setError("Could not connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sortBy === "Price: Low to High") list.sort((a, b) => a.price - b.price);
        else if (sortBy === "Price: High to Low") list.sort((a, b) => b.price - a.price);
        else if (sortBy === "Newest First") list.reverse();
        return list;
    }, [products, sortBy]);

    const displayedProducts = sortedProducts.length > 0 ? sortedProducts : FALLBACK_DRESSES;

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Women Dresses</h1>
                    <p className="text-gray-500 text-sm mt-1">Dedicated page for all dresses in women collection.</p>
                    <Link href="/women?category=all" className="inline-block mt-3 text-sm text-pink-600 hover:text-pink-700 font-medium">
                        ← Back to Women Categories
                    </Link>
                </div>

                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium text-gray-900">{displayedProducts.length}</span>
                        <span>Dresses</span>
                    </div>

                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none px-4 py-2 pr-10 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer outline-none"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                ) : displayedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                image={product.image}
                                title={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                discount={product.discount}
                                tag={product.tag}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No dresses found</h3>
                        <p className="text-gray-500">Add women dress products from admin panel.</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
