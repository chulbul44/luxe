"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = ["All", "Dresses", "Ethnic Wear", "Tops", "Bottoms", "Jackets", "Accessories"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest First"];
const CATEGORY_QUERY_MAP: Record<string, string> = {
    All: "all",
    Dresses: "dresses",
    "Ethnic Wear": "ethnic-wear",
    Tops: "tops",
    Bottoms: "bottoms",
    Jackets: "jackets",
    Accessories: "accessories",
};
const QUERY_TO_CATEGORY_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(CATEGORY_QUERY_MAP).map(([key, value]) => [value, key])
);
const CATEGORY_KEYWORDS: Record<string, string[]> = {
    Dresses: ["dress", "gown", "one piece", "maxi", "midi"],
    "Ethnic Wear": ["ethnic", "kurti", "kurta", "saree", "lehenga", "salwar", "anarkali"],
    Tops: ["top", "t-shirt", "tee", "blouse", "shirt", "crop"],
    Bottoms: ["jean", "pant", "trouser", "bottom", "skirt", "palazzo", "legging"],
    Jackets: ["jacket", "blazer", "coat", "shrug"],
    Accessories: ["accessory", "bag", "belt", "scarf", "jewelry", "watch", "sunglass"],
};

export default function WomenPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <WomenPageContent />
        </Suspense>
    );
}

function WomenPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getCategoryFromQuery = () => {
        const queryCategory = searchParams.get("category") || "all";
        return QUERY_TO_CATEGORY_MAP[queryCategory] || "All";
    };

    const updateCategory = (category: string) => {
        const queryValue = CATEGORY_QUERY_MAP[category] || "all";
        setSelectedCategory(category);
        router.push(`/women?category=${queryValue}`);
    };

    const getSearchText = (product: Product) =>
        `${product.name} ${product.category} ${product.description || ""} ${product.tag || ""}`.toLowerCase();

    const isWomenProduct = (product: Product) => {
        const searchable = getSearchText(product);
        return searchable.includes("women") || searchable.includes("female") || product.category === "Women";
    };

    const matchSubCategory = (product: Product, category: string) => {
        if (category === "All") return true;
        const keywords = CATEGORY_KEYWORDS[category] || [];
        const searchable = getSearchText(product);
        return keywords.some((keyword) => searchable.includes(keyword));
    };

    const applySort = (list: Product[]) => {
        const sorted = [...list];
        if (sortBy === "Price: Low to High") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === "Newest First") {
            sorted.reverse();
        }
        return sorted;
    };

    useEffect(() => {
        setSelectedCategory(getCategoryFromQuery());
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products.filter((p: Product) => isWomenProduct(p)));
                    setError("");
                } else {
                    setError(data.message || "Unable to load products.");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Could not connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = applySort(products.filter((product) => matchSubCategory(product, selectedCategory)));

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
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>

                        {/* Sort Dropdown */}
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
                                    category === "Dresses" ? (
                                        <Link
                                            key={category}
                                            href="/women/dresses"
                                            className={`block w-full text-left px-5 py-3 rounded-xl font-medium transition-all ${selectedCategory === category
                                                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                                                : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:text-pink-600"
                                                }`}
                                        >
                                            {category}
                                        </Link>
                                    ) : (
                                        <button
                                            key={category}
                                            onClick={() => updateCategory(category)}
                                            className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all ${selectedCategory === category
                                                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                                                : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:text-pink-600"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Area */}
                    <div className="flex-1">
                        {error && (
                            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}
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
