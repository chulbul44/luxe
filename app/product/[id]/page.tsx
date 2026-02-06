"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, Check } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// Mock Data (matches ProductSection) - In a real app, fetch from API
const PRODUCTS = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        title: "Floral Summer Dress",
        price: 2499,
        originalPrice: 4999,
        discount: 50,
        rating: 4.8,
        reviews: 124,
        description: "Embrace the summer vibe with this stunning floral dress. Crafted from breathable cotton fabric, it features a flattering A-line silhouette, adjustable straps, and a vibrant print that captures the essence of the season. Perfect for brunches, beach walks, and casual outings."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1529139574466-a302d2753a90?w=800&q=80",
        title: "Elegant Evening Gown",
        price: 5999,
        originalPrice: 8999,
        discount: 33,
        rating: 4.9,
        reviews: 89,
        description: "Make a statement at your next formal event with this elegant evening gown. The intricate beadwork and flowing chiffon fabric create a sophisticated look, while the deep V-neckline adds a touch of allure. Available in classic black and navy."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
        title: "Casual Denim Jacket",
        price: 1999,
        originalPrice: 2499,
        discount: 20,
        rating: 4.5,
        reviews: 210,
        description: "A timeless wardrobe staple, this casual denim jacket offers versatility and style. Made from durable denim with a hint of stretch for comfort, it features classic button details and multiple pockets. Layer it over a dress or pair it with jeans for a double-denim look."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=800&q=80",
        title: "Classic White Tee",
        price: 499,
        originalPrice: 999,
        discount: 50,
        rating: 4.6,
        reviews: 450,
        description: "You can never go wrong with a classic white tee. This premium cotton t-shirt is soft, breathable, and designed for a relaxed fit. It's the ultimate base layer for any outfit, whether you're dressing up or keeping it casual."
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1548624238-92005ecf917d?w=800&q=80",
        title: "Slim Fit Chinos",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.4,
        reviews: 156,
        description: "Upgrade your casual wear with these slim-fit chinos. Tailored for a modern silhouette, they are made from a cotton-blend fabric that offers both comfort and durability. Available in a range of versatile colors."
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1564583630748-0d086c350caa?w=800&q=80",
        title: "Boho Chic Skirt",
        price: 799,
        originalPrice: 1499,
        discount: 47,
        rating: 4.7,
        reviews: 98,
        description: "Channel your inner bohemian spirit with this chic skirt. The lightweight fabric and flowy design make it perfect for warm weather. Pair it with a crop top and sandals for an effortless festival-ready look."
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&q=80",
        title: "Silk Scarf",
        price: 899,
        originalPrice: 1299,
        discount: 30,
        rating: 4.9,
        reviews: 55,
        description: "Add a touch of luxury to your ensemble with this pure silk scarf. The smooth texture and vibrant print make it a versatile accessory that can be worn around the neck, as a headband, or tied to your bag."
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
        title: "Running Shoes",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        rating: 4.8,
        reviews: 320,
        description: "Hit the ground running with these high-performance running shoes. Engineered for support and cushioning, they feature a breathable mesh upper and a responsive sole. Ideal for daily jogs or intense training sessions."
    }
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];

    const [selectedSize, setSelectedSize] = useState("M");

    const handleAddToCart = () => {
        alert(`Added ${quantity} x ${product.title} (Size: ${selectedSize}) to cart!`);
    };

    return (
        <div className="min-h-screen bg-soft-bg py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb / Back */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Image Gallery (Left) */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white group">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 z-10">
                                <button className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-pink-50 text-gray-600 hover:text-pink-500 transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4 z-10">
                                <span className="px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                                    {product.discount}% OFF
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Product Details (Right) */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <div className="flex items-center justify-between items-start">
                                <div>
                                    <h5 className="text-pink-600 font-medium tracking-wide text-sm mb-2">NEW ARRIVAL</h5>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                        {product.title}
                                    </h1>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center text-yellow-500 gap-1">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="font-bold text-lg">{product.rating}</span>
                                </div>
                                <span className="text-gray-400 text-sm">|</span>
                                <span className="text-gray-500 text-sm underline cursor-pointer hover:text-gray-800">
                                    {product.reviews} Reviews
                                </span>
                            </div>

                            <div className="mt-6 flex items-baseline gap-4">
                                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                    Save ₹{product.originalPrice - product.price}
                                </span>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="prose prose-sm sm:prose-base text-gray-600 leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {/* Options */}
                        <div className="space-y-6">
                            {/* Size */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-gray-800">Select Size</span>
                                    <button className="text-pink-600 text-sm font-medium hover:underline">Size Guide</button>
                                </div>
                                <div className="flex gap-3">
                                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium transition-all ${selectedSize === size
                                                ? "bg-gray-900 text-white shadow-lg scale-105"
                                                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-900"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            {/* <div>
                                <span className="font-semibold text-gray-800 block mb-3">Quantity</span>
                                <div className="flex items-center gap-4 bg-white border border-gray-200 w-max rounded-xl p-1">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-xl font-medium"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-xl font-medium"
                                    >
                                        +
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="flex-none w-16 bg-white border border-gray-200 text-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-50 shadow-sm hover:shadow-md transition-all">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                In Stock
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                Free Delivery
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
