import React from 'react';
import { Button } from '../common/index.jsx';
import { NAVIGATION_ITEMS } from '../../data/constants.js';

/**
 * Header Component
 * Fő navigációs fejléc a logóval és menüvel
 */
export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <nav className="flex items-center justify-between">

        <a href="/" className="text-2xl font-bold tracking-wider">
          <span className="text-white">PLA</span>
          <span className="text-purple-500">TERA</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <Button variant="primary" size="sm">
            Belépés
          </Button>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
);

export default Header;
