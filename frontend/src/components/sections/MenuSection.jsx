import React, { useState } from 'react';
import { Card, SectionTitle } from '../common/index.jsx';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/constants.js';

/**
 * MenuSection Component
 * Étlap szekció tab navigációval és ételtételekkel
 */
export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('pasta');
  
  return (
    <section id="menu" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="Étlapunk"
          subtitle="Válogass kedvenc olasz fogásaink közül"
        />
        
        {/* Category Tabs */}
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MENU_ITEMS[activeCategory]?.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * CategoryTabs Component
 * Tab navigáció a menü kategóriákhoz
 */
const CategoryTabs = ({ activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap justify-center gap-2 mb-12 bg-zinc-900/50 rounded-full p-1.5 max-w-2xl mx-auto">
    {MENU_CATEGORIES.map((category) => (
      <button
        key={category.id}
        onClick={() => onCategoryChange(category.id)}
        className={`
          px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
          ${activeCategory === category.id
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
            : 'text-gray-400 hover:text-white'
          }
        `}
      >
        {category.label}
      </button>
    ))}
  </div>
);

/**
 * MenuItem Component
 * Egyedi étel kártya
 */
const MenuItem = ({ item }) => (
  <Card className="p-4 flex items-center gap-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
    />
    <div className="flex-grow min-w-0">
      <h3 className="text-white font-semibold">{item.name}</h3>
      <p className="text-gray-500 text-sm truncate">{item.description}</p>
    </div>
    <span className="text-purple-400 font-semibold whitespace-nowrap">
      {item.price}
    </span>
  </Card>
);

export default MenuSection;
