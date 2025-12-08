import React from 'react';
import { Card } from '../common/index.jsx';
import { STATS } from '../../data/constants.js';

/**
 * StorySection Component
 * Történetünk szekció képpel és statisztikákkal
 */
export const StorySection = () => (
  <section id="story" className="py-20 bg-zinc-900/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=500&fit=crop"
              alt="Séfjeink"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Történetünk
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A Platera étterem 2025-ben nyitotta meg kapuit Budapest szívében. 
            Célunk, hogy az autentikus olasz ízeket és a mediterrán vendégszeretetet 
            elhozzuk Magyarországra. Séfjeink Nápolyban tanultak, és a legfrissebb, 
            legfinomabb alapanyagokból készítik el tradicionális fogásainkat.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * StatCard Component
 * Statisztika kártya
 */
const StatCard = ({ value, label }) => (
  <Card className="p-4 text-center" hover={false}>
    <div className="text-2xl font-bold text-purple-400">{value}</div>
    <div className="text-gray-500 text-sm">{label}</div>
  </Card>
);

export default StorySection;
