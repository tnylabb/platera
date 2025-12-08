import React from 'react';
import { Header, Hero, Menu, Story, Contact, Footer } from './components';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        <Hero />
        <Menu />
        <Story />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
