'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-10 mt-10 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {/* Column 1: Address */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p>
                        447 Broadway, 2nd floor #1179<br />
                        New York, NY 10013
                    </p>
                    <p>Phone: [Your Phone Number]</p>
                    <p>
                        Email: <a href="mailto:info@louisseafood.com" className="text-blue-300 hover:text-white">info@louisseafood.com</a>
                    </p>
                </div>

                {/* Column 2: (Now at Position 3) Quick Links */}
              {/* Column 2: Quick Links - Now on the right and text aligned right */}
<div className="md:col-start-3 text-right">
    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
    <ul className="space-y-2">
        <li>
            <Link href="/" className="text-blue-300 hover:text-white">Home</Link>
        </li>
        <li>
            <Link href="/products-services" className="text-blue-300 hover:text-white">Products</Link>
        </li>
        <li>
            <Link href="/about" className="text-blue-300 hover:text-white">About</Link>
        </li>
        <li>
            <Link href="/contact" className="text-blue-300 hover:text-white">Contact</Link>
        </li>
    </ul>
</div>


                {/* Optional Column 3 (middle or placeholder) */}
                {/* You can add another section here if needed */}
            </div>

            {/* Bottom copyright */}
            <div className="mt-8 border-t pt-4 text-sm">
                <p>© 2025 Louis Seafood. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
