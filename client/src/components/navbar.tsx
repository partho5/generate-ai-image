// client/src/components/navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';
import {appName} from "../../../shared/values";

const navItems = {
  nextLinks: [
    { name: 'Home', href: '/' },
    { name: 'Generated Images', href: '/generated-images' },
    { name: 'Dashboard', href: '/dashboard' },
  ],
  anchorLinks: {
    loginItem: { name: 'Login', href: '/api/auth/login' },
    logoutItem: { name: 'Logout', href: '/api/auth/logout' },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  let authNavItem = navItems.anchorLinks.loginItem;
  if (!isLoading && user) {
    authNavItem = navItems.anchorLinks.logoutItem;
  }

  return (
      <nav className="bg-gray-900">
        <div className="max-w-screen-xl mx-auto p-2 flex justify-between items-center">
          <Link href="/" className="text-white text-lg font-semibold">{appName}</Link>
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none"
              aria-label="Toggle menu"
          >
            {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.nextLinks.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`block p-2 ${
                        item.href === pathname ? 'text-white' : 'text-zinc-300'
                    }`}
                    onClick={() => setIsOpen(false)} // Close the menu on link click
                >
                  {item.name}
                </Link>
            ))}
            <a
                key={authNavItem.href}
                href={authNavItem.href}
                className="text-zinc-300  hover:text-red-300 mt-2"
            >
              {authNavItem.name}
            </a>
          </div>
        </div>

        {/* Drawer for Mobile View */}
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
        >
          <div className="p-4">
            {navItems.nextLinks.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`block p-2 mb-2 ${
                        item.href === pathname ? 'text-white text-lg border-b-blue-400' : 'text-zinc-300'
                    }`}
                    onClick={() => setIsOpen(false)} // Close the menu on link click
                >
                  {item.name}
                </Link>
            ))}
            <a
                key={authNavItem.href}
                href={authNavItem.href}
                className="block rounded hover:text-red-300 text-zinc-300 p-2"
                onClick={() => setIsOpen(false)} // Close the menu on link click
            >
              {authNavItem.name}
            </a>
          </div>
        </div>
      </nav>
  );
}