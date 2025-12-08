import React from 'react';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Háttér glow effektek */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-platera-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-platera-700/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Szöveg */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
              Autentikus olasz{' '}
              <span className="text-gradient">élmények</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Fedezd fel a hagyományos olasz konyha ízeit a Platera éttermében. 
              Friss alapanyagok, családi receptek és egy csipetnyi nápolyi varázslat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#menu"
                className="px-8 py-3 bg-platera-500 hover:bg-platera-600 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-platera-500/25 hover:-translate-y-0.5"
              >
                Menü megtekintése
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-zinc-700 hover:border-platera-500 rounded-full font-semibold transition-all hover:bg-zinc-800/50"
              >
                Asztalfoglalás
              </a>
            </div>
          </div>

          {/* Kép */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-[4/3] rounded-t-[100px] overflow-hidden glow-purple">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
                alt="Olasz ételek"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
            </div>
            {/* Lebegő kártya */}
            <div className="absolute -bottom-6 -left-6 bg-zinc-900/90 backdrop-blur-sm p-4 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-platera-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold">4.9/5 értékelés</p>
                  <p className="text-sm text-zinc-400">500+ vélemény</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
