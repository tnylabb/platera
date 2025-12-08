import React from 'react';

function Story() {
  return (
    <section id="story" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Kép */}
          <div className="relative group">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=600&fit=crop"
                alt="Étterem belső"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Dekoratív keret */}
            <div className="absolute inset-4 border-2 border-platera-500/30 rounded-3xl group-hover:border-platera-500/60 group-hover:inset-2 transition-all duration-500" />
          </div>

          {/* Szöveg */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Történetünk és <span className="text-gradient">szenvedélyünk</span>
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                A Platera 2010-ben nyitotta meg kapuit Budapest szívében, 
                azzal a céllal, hogy az autentikus olasz ízeket hozza el 
                a magyar fővárosba.
              </p>
              <p>
                Alapítónk, Marco Rossi Nápolyból érkezett, és magával hozta 
                családja évszázados receptjeit. Minden tészta házi készítésű, 
                minden alapanyag a legfrissebb és legminőségibb.
              </p>
              <p>
                Nálunk nem csak étkezni jössz - egy darab Olaszországot 
                vihetsz haza minden falattal.
              </p>
            </div>

            {/* Statisztikák */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-3xl font-bold text-platera-400">14+</p>
                <p className="text-sm text-zinc-500">Év tapasztalat</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-platera-400">50k+</p>
                <p className="text-sm text-zinc-500">Boldog vendég</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-platera-400">100%</p>
                <p className="text-sm text-zinc-500">Friss alapanyag</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;
