import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import MenuItem from './MenuItem';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('pasta');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section id="menu" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Szekció cím */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Étlapunk <span className="text-gradient">kínálata</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Minden étel friss, helyi alapanyagokból készül hagyományos olasz receptek alapján.
          </p>
        </div>

        {/* Kategória tabok */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`
                px-6 py-2.5 rounded-full font-medium transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-platera-500 text-white shadow-lg shadow-platera-500/25 bg-shimmer animate-shimmer'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menü elemek grid */}
        <div 
          className={`
            grid grid-cols-1 md:grid-cols-2 gap-4
            transition-opacity duration-200
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {MENU_ITEMS[activeCategory]?.map((item, index) => (
            <MenuItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
