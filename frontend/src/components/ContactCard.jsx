import React from 'react';

function ContactCard({ icon, title, value }) {
  return (
    <div className="group bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-platera-500/50 transition-all duration-300 text-center">
      <div className="w-12 h-12 bg-platera-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-platera-400 group-hover:bg-platera-500/30 group-hover:scale-110 transition-all">
        {icon}
      </div>
      <h3 className="font-medium text-zinc-300 mb-1">{title}</h3>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

export default ContactCard;
