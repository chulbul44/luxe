"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Fetch cart from backend on mount or when token changes
    useEffect(() => {
        setIsMounted(true);
        const token = localStorage.getItem("token");

        const loadCart = async () => {
            if (token) {
                try {
                    const res = await fetch("http://localhost:5000/api/cart", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (data.success) {
                        // Map backend productId back to frontend id
                        const mappedItems = data.cart.map((item: any) => ({
                            ...item,
                            id: item.productId
                        }));
                        setCart(mappedItems);
                    }
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            } else {
                const savedCart = localStorage.getItem("cart");
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart));
                    } catch (error) {
                        console.error("Failed to parse cart from local storage", error);
                    }
                }
            }
        };

        loadCart();
    }, []);

    // Sync cart to backend or local storage whenever it changes
    useEffect(() => {
        if (!isMounted) return;

        const syncCart = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    // Map frontend id to backend productId
                    const mappedItems = cart.map(item => ({
                        ...item,
                        productId: item.id
                    }));

                    await fetch("http://localhost:5000/api/cart/sync", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ items: mappedItems })
                    });
                } catch (error) {
                    console.error("Error syncing cart:", error);
                }
            } else {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        };

        syncCart();
    }, [cart, isMounted]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id && i.size === item.size);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prevCart, item];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string, size: string) => {
        setCart((prevCart) => prevCart.filter((i) => !(i.id === id && i.size === size)));
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
                isMounted,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
