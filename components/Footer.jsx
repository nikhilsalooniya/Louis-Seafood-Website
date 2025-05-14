'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-10 mt-10 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Address */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p>447 Broadway, 2nd floor #1179
                        New York, NY 10013
                    </p>
                    <p>Phone: [Your Phone Number]</p>
                    <p>Email: <a href="mailto:info@louisseafood.com" className="text-blue-300 hover:text-white">info@louisseafood.com</a></p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="text-blue-300 hover:text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="/products-services" className="text-blue-300 hover:text-white">Products & Services</Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-blue-300 hover:text-white">About</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-blue-300 hover:text-white">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: FAQ */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">FAQ</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/faq#shipping" className="text-blue-300 hover:text-white">Shipping Information</Link>
                        </li>
                        <li>
                            <Link href="/faq#returns" className="text-blue-300 hover:text-white">Returns & Exchanges</Link>
                        </li>
                        <li>
                            <Link href="/faq#payment" className="text-blue-300 hover:text-white">Payment Methods</Link>
                        </li>
                        <li>
                            <Link href="/faq#account" className="text-blue-300 hover:text-white">Account Setup</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="mt-8 border-t pt-4">
                <p className="text-sm">© 2025 Louis Seafood. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
