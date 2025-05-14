'use client'; // Ensure this file is a client component

import './globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { usePathname } from 'next/navigation';
import ChatBot from '../../components/ChatBot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current path

  // Check if the current path is '/admin'
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className="bg-white text-gray-800 max-w-screen-xl mx-auto">
        {/* Conditionally render Header and Footer */}
        {!isAdmin && <Header />}
        
        <main className="relative z-0">{children}</main>
        {/* Conditionally render ChatBot */}
        {!isAdmin && <ChatBot />}
        
        {/* Conditionally render Footer */}
        
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
