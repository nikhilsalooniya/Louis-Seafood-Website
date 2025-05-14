'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';



const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setIsSticky(currentScroll <= lastScrollTop);
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, lastScrollTop]);

  if (!isMounted) return null;

  return (
    <>
      {/* Address + Phone Top Bar */}
      <div className="bg-gray-900 text-white text-sm px-6 py-2 flex justify-between items-center">
        <span></span>
        <span></span>
      </div>

      <header
        className={` text-gray-900 py-4 px-6 shadow-md transition-all duration-300 ${isSticky ? 'sticky top-0 z-50' : '-top-20'
          }`}
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo2.png"
                alt="Seafood Delight Logo"
                width={160}
                height={50}
                className="h-auto w-auto object-contain"
                priority
              />
              <span className="text-gray-900 font-bold text-xl">Louis</span>
            </div>
          </Link>




          <ul className="hidden md:flex space-x-6 font-bold text-base ml-6"> {/* shifted slightly left using ml-6 */}
            <li>
              <Link
                href="/"
                className={`px-3 py-1 rounded-full transition-all ${pathname === '/' ? 'bg-white border border-gray-900 text-gray-900' : ''
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/product-services"
                className={`px-3 py-1 rounded-full transition-all ${pathname === '/product-services' ? 'bg-white border border-gray-900 text-gray-900' : ''
                  }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`px-3 py-1 rounded-full transition-all ${pathname === '/about' ? 'bg-white border border-gray-900 text-gray-900' : ''
                  }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`px-3 py-1 rounded-full transition-all ${pathname === '/contact' ? 'bg-white border border-gray-900 text-gray-900' : ''
                  }`}
              >
                Contact
              </Link>
            </li>
          </ul>


          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <span className="text-xl font-semibold">Menu</span>
            <button onClick={() => setMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-col p-6 space-y-6 text-lg font-medium">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/product-services" onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>

        {/* Backdrop */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </header>

    </>
  );
};

export default Header;
