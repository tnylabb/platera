import React from 'react';

function MenuItem({ item, index }) {
  return (
    <div
      className="group bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800 hover:border-platera-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-platera-500/10 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Kép */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Tartalom */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg group-hover:text-platera-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            {item.description}
          </p>
        </div>

        {/* Ár */}
        <div className="flex items-center gap-2">
          <span className="text-platera-400 font-bold text-lg group-hover:scale-110 transition-transform">
            {item.price}
          </span>
          <span className="w-2 h-2 bg-platera-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
