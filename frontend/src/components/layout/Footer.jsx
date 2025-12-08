import React from 'react';
import { IconWrapper } from '../common/Icons.jsx';

/**
 * Footer Component
 * Lábléc social media linkekkel és copyright információval
 */
export const Footer = () => (
  <footer className="bg-zinc-950 border-t border-zinc-800/50 py-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-400 text-sm">Kövess minket</p>
        
        
        <div className="flex gap-4">
          <SocialLink href="#" icon="instagram" />
          <SocialLink href="#" icon="facebook" />
        </div>
        
        
        <p className="text-gray-500 text-sm">
          © 2025 Platera. Minden jog fenntartva.
        </p>
      </div>
    </div>
  </footer>
);

/**
 * SocialLink Component
 * Újrafelhasználható social media link gomb
 */
const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-zinc-700 transition-all duration-200"
    aria-label={icon}
  >
    <IconWrapper icon={icon} size="sm" />
  </a>
);

export default Footer;
