"use client";

import Link from "next/link";
import { ShoppingCart, Eye, Heart } from "lucide-react";

interface ProductProps {
    id: number;
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    tag?: string;
}

export default function ProductCard({ id, image, title, price, originalPrice, discount, tag }: ProductProps) {
    return (
        <Link href={`/product/${id}`} className="block group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-transparent hover:border-gray-100">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">

                {/* Placeholder for Next/Image - Using a div with background for demo simplicity, but structure ready for Image */}
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                ></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount && (
                        <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                            {discount}
                        </span>
                    )}
                    {tag && (
                        <span className="px-2 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                            {tag}
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <Heart className="w-4 h-4" />
                </button>

                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 pb-6">
                    <button className="flex-1 bg-white text-gray-900 py-2.5 rounded-lg font-medium text-sm hover:bg-black hover:text-white transition-colors shadow-lg flex justify-center items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                    <button className="p-2.5 bg-white text-gray-900 rounded-lg hover:bg-black hover:text-white transition-colors shadow-lg">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-gray-700 font-medium text-sm truncate group-hover:text-pink-600 transition-colors cursor-pointer">
                    {title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-900 font-bold">₹{price}</span>
                    {originalPrice && (
                        <span className="text-gray-400 text-sm line-through">₹{originalPrice}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
