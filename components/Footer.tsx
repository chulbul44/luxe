import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Luxe.
                        </span>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Redefining simplified fashion with sustainable materials and modern aesthetics. Designed for the bold and beautiful.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <SocialIcon Icon={Instagram} />
                            <SocialIcon Icon={Facebook} />
                            <SocialIcon Icon={Twitter} />
                            <SocialIcon Icon={Youtube} />
                        </div>
                    </div>

                    {/* Quick Shop */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-6">Shop</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <FooterLink>New Arrivals</FooterLink>
                            <FooterLink>Women's Collection</FooterLink>
                            <FooterLink>Men's Collection</FooterLink>
                            <FooterLink>Accessories</FooterLink>
                            <FooterLink>Sale & Offers</FooterLink>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-6">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <FooterLink>Track Order</FooterLink>
                            <FooterLink>Returns & Exchanges</FooterLink>
                            <FooterLink>Shipping Info</FooterLink>
                            <FooterLink>Size Guide</FooterLink>
                            <FooterLink>Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-6">Stay in Loop</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:border-pink-300 transition-colors"
                                />
                            </div>
                            <button className="bg-pink-500 hover:bg-pink-600 text-white p-2.5 rounded-lg transition-colors">
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>© 2026 Luxe Fashion. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-gray-600 cursor-pointer">Cookie Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ Icon }: { Icon: any }) {
    return (
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-pink-500 transition-all duration-300">
            <Icon className="w-5 h-5" />
        </button>
    );
}

function FooterLink({ children }: { children: React.ReactNode }) {
    return (
        <li className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
            {children}
        </li>
    );
}
