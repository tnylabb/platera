import React, { useState } from 'react';
import { NAV_ITEMS } from '../data/menuData';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="font-display text-3xl tracking-wider text-white hover:text-platera-500 transition-colors">
            PLATERA
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-zinc-300 hover:text-platera-400 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 bg-platera-500 hover:bg-platera-600 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-platera-500/25"
            >
              Foglalás
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-zinc-300 hover:text-platera-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-4 px-5 py-2 bg-platera-500 rounded-full text-center font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Foglalás
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
