import React from 'react';

/**
 * Button Component
 * Újrafelhasználható gomb többféle variánssal és mérettel
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full';
  
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50',
    secondary: 'bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10',
    ghost: 'bg-transparent text-gray-300 hover:text-white',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Card Component
 * Univerzális kártya komponens hover effektekkel
 */
export const Card = ({ children, className = '', hover = true }) => (
  <div 
    className={`
      bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-800/50
      ${hover ? 'transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

/**
 * SectionTitle Component
 * Egységes szekció címek cím és alcím opcióval
 */
export const SectionTitle = ({ title, subtitle, className = '' }) => (
  <div className={`text-center mb-12 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
    {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
  </div>
);
