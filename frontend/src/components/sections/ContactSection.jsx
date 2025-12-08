import React from 'react';
import { Card, SectionTitle } from '../common/index.jsx';
import { IconWrapper } from '../common/Icons.jsx';
import { CONTACT_INFO } from '../../data/constants.js';

/**
 * ContactSection Component
 * Kapcsolat szekció az elérhetőségekkel
 */
export const ContactSection = () => (
  <section id="contact" className="py-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle 
        title="Látogass el hozzánk"
        subtitle="Várunk szeretettel minden nap"
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {CONTACT_INFO.map((info) => (
          <ContactCard key={info.title} {...info} />
        ))}
      </div>
    </div>
  </section>
);

/**
 * ContactCard Component
 * Kapcsolati információ kártya
 */
const ContactCard = ({ icon, title, lines }) => (
  <Card className="p-6 text-center">
    <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4">
      <IconWrapper icon={icon} className="text-purple-400" />
    </div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    {lines.map((line, index) => (
      <p key={index} className="text-gray-500 text-sm">
        {line}
      </p>
    ))}
  </Card>
);

export default ContactSection;
