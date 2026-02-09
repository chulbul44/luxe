"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types";
import { useState, useEffect } from "react";

const CATEGORIES = ["All", "Shirts", "T-Shirts", "Bottoms", "Jackets", "Footwear", "Accessories"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest First"];

export default function MenPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                if (data.success) {
                    // Filter for Men's category
                    setProducts(data.products.filter((p: Product) => p.category.toLowerCase().includes("men") || p.category === "Men"));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />


            {/* Filters and Products */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">

                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium text-gray-900">{filteredProducts.length}</span>
                        <span>Products</span>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>

                        <div className="relative flex-1 sm:flex-none">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto appearance-none px-4 py-2 pr-10 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer outline-none"
                            >
                                {SORT_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Category Filters */}
                    <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <div className="sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 hidden md:block">Categories</h3>
                            <div className="flex flex-col gap-2">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all ${selectedCategory === category
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                            : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Area */}
                    <div className="flex-1">
                        {/* Products Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-2xl"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {filteredProducts.map((product) => (
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
                        )}

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Filter className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
