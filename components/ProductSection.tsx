import ProductCard from "./ProductCard";

const PRODUCTS = [
    {
        id: "1",
        title: "Floral Georgette Maxi Dress",
        price: 1499,
        originalPrice: 2999,
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2692&auto=format&fit=crop",
        tag: "Best Seller"
    },
    {
        id: "2",
        title: "Embroidered Cotton Kurti Set",
        price: 899,
        originalPrice: 1599,
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2670&auto=format&fit=crop",
        tag: "New"
    },
    {
        id: "3",
        title: "Classic White Sneakers",
        price: 2499,
        originalPrice: 3500,
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2590&auto=format&fit=crop",
    },
    {
        id: "4",
        title: "Silk Blend Banarasi Saree",
        price: 3999,
        originalPrice: 7999,
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1610030469983-98e55041d04f?q=80&w=2574&auto=format&fit=crop",
        tag: "Premium"
    },
    {
        id: "5",
        title: "Denim Jacket with Patches",
        price: 1999,
        originalPrice: 2500,
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "6",
        title: "Rose Gold Plated Watch",
        price: 2999,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2599&auto=format&fit=crop",
    },
    {
        id: "7",
        title: "Slim Fit Chinos - Beige",
        price: 1299,
        originalPrice: 1999,
        discount: "35% OFF",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "8",
        title: "Boho Chic Tote Bag",
        price: 799,
        originalPrice: 1299,
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2574&auto=format&fit=crop",
        tag: "Trending"
    },
];

export default function ProductSection() {
    return (
        <section className="py-16 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Trending Now
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Handpicked favorites jut for you. Explore our best-selling items that are flying off the shelves.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                    {PRODUCTS.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id.toString()}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                            tag={product.tag}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-white border border-gray-300 text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
}
