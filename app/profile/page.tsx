"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    User,
    MapPin,
    CreditCard,
    Package,
    Heart,
    Ticket,
    Bell,
    Star,
    Wallet,
    Power,
    Loader2
} from "lucide-react"

// Types
interface SidebarItem {
    id: string
    name: string
    icon: any
}

interface SidebarGroup {
    group: string
    items: SidebarItem[]
}

const SIDEBAR_CONTENT: SidebarGroup[] = [
    {
        group: "MY ORDERS",
        items: [{ id: "my-orders", name: "My Orders", icon: Package }]
    },
    {
        group: "ACCOUNT SETTINGS",
        items: [
            { id: "profile-info", name: "Profile Information", icon: User },
            { id: "manage-addresses", name: "Manage Addresses", icon: MapPin },
            { id: "pan-card", name: "PAN Card Information", icon: CreditCard }
        ]
    },
    {
        group: "PAYMENTS",
        items: [
            { id: "gift-cards", name: "Gift Cards", icon: Wallet },
            { id: "saved-cards", name: "Saved Cards", icon: CreditCard }
        ]
    },
    {
        group: "MY STUFF",
        items: [
            { id: "my-coupons", name: "My Coupons", icon: Ticket },
            { id: "my-wishlist", name: "My Wishlist", icon: Heart }
        ]
    }
]

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("profile-info")
    const [user, setUser] = useState<any>(null)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: { street: "", city: "", state: "", pinCode: "" }
    })

    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                router.push("/login")
                return
            }
            try {
                const res = await fetch("http://localhost:5000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                if (data.success) {
                    setUser(data.user)
                    setFormData({
                        name: data.user.name || "",
                        phone: data.user.phone || "",
                        address: {
                            street: data.user.address?.street || "",
                            city: data.user.address?.city || "",
                            state: data.user.address?.state || "",
                            pinCode: data.user.address?.pinCode || ""
                        }
                    })
                }
            } catch (error) {
                console.error("Fetch error")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        const token = localStorage.getItem("token")
        try {
            const res = await fetch("http://localhost:5000/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) alert("Profile Updated!")
        } catch (error) {
            alert("Error updating profile")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-4">

                {/* Sidebar */}
                <aside className="w-full md:w-80 flex flex-col gap-4">
                    <div className="bg-white p-3 flex items-center gap-4 shadow-sm border border-gray-100">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=random`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Hello,</p>
                            <h2 className="font-bold text-gray-800">{user?.name}</h2>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm overflow-hidden border border-gray-100">
                        {SIDEBAR_CONTENT.map((group, gIdx) => (
                            <div key={gIdx} className="border-b border-gray-100 last:border-0">
                                <div className="px-6 py-4 flex items-center gap-4">
                                    <h3 className="font-bold text-gray-400 text-sm tracking-wide uppercase">{group.group}</h3>
                                </div>
                                <div className="pb-2">
                                    {group.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full text-left px-16 py-3 text-sm transition-colors ${activeTab === item.id ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-gray-100">
                            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-gray-600 hover:text-blue-600 font-bold">
                                <Power className="w-5 h-5 text-blue-600" />
                                <span className="text-sm uppercase tracking-wide">Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 bg-white shadow-sm p-8 min-h-[600px] border border-gray-100">
                    {activeTab === "profile-info" && (
                        <div className="animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-8">Personal Information</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold uppercase">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold uppercase">Phone Number</label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="px-10 py-3 bg-[#fb641b] text-white font-bold uppercase shadow-md hover:bg-[#e65a17] transition-all">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === "manage-addresses" && (
                        <div className="animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-8">Manage Addresses</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    value={formData.address.street}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-blue-500"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input type="text" placeholder="City" value={formData.address.city} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })} className="w-full px-4 py-3 border border-gray-200" />
                                    <input type="text" placeholder="State" value={formData.address.state} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })} className="w-full px-4 py-3 border border-gray-200" />
                                    <input type="text" placeholder="Pin Code" value={formData.address.pinCode} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pinCode: e.target.value } })} className="w-full px-4 py-3 border border-gray-200" />
                                </div>
                                <button type="submit" className="px-10 py-3 bg-[#fb641b] text-white font-bold uppercase">Save Address</button>
                            </form>
                        </div>
                    )}

                    {activeTab !== "profile-info" && activeTab !== "manage-addresses" && (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
                            <Package className="w-16 h-16 text-gray-200 mb-6" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Coming Soon</h3>
                            <p className="text-gray-500">We are currently working on this feature.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
