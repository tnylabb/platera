import React from 'react';
import { Button } from '../common/index.jsx';

/**
 * HeroSection Component
 * Főoldal hero szekció a fő üzenettel és Call to Action gombokkal
 */
export const HeroSection = () => (
  <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-zinc-950 to-zinc-950" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Autentikus olasz </span>
            <span className="text-purple-400">élmények</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Fedezd fel a hagyományos olasz konyha ízeit a Platera éttermében. 
            Friss alapanyagok, családi receptek és egy csipetnyi nápolyi varázslat.
          </p>
          <div className="flex  flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Menü megtekintése
            </Button>
            <Button variant="secondary" size="lg">
              Asztalfoglalás
            </Button>
          </div>
        </div>
        
        <HeroImage />
      </div>
    </div>
  </section>
);

/**
 * HeroImage Component
 * Hero kép glow effekttel
 */
const HeroImage = () => (
  <div className="relative flex justify-center lg:justify-end">
    {/* Glow effect */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-80 h-80 bg-purple-600/30 rounded-full blur-3xl" />
    </div>
    
    <div className="relative rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=600&fit=crop"
        alt="Platera étterem"
        className="w-full max-w-md h-auto object-cover"
      />
    </div>
  </div>
);

export default HeroSection;
