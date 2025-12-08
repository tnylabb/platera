// Navigációs menüpontok
export const NAV_ITEMS = [
  { label: 'Menü', href: '#menu' },
  { label: 'Rólunk', href: '#story' },
  { label: 'Kapcsolat', href: '#contact' },
];

// Menü kategóriák
export const MENU_CATEGORIES = [
  { id: 'appetizers', label: 'Előételek' },
  { id: 'pasta', label: 'Tészták' },
  { id: 'pizza', label: 'Pizzák' },
  { id: 'desserts', label: 'Desszertek' },
];

// Menü ételek kategóriánként
export const MENU_ITEMS = {
  appetizers: [
    {
      id: 1,
      name: 'Bruschetta Classica',
      description: 'Pirított kenyér, friss paradicsom, bazsalikom',
      price: '1800 Ft',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Caprese Salata',
      description: 'Buffalo mozzarella, paradicsom, friss bazsalikom',
      price: '2400 Ft',
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Antipasto Misto',
      description: 'Olasz felvágottak, sajt, olajbogyó',
      price: '3200 Ft',
      image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Arancini',
      description: 'Töltött rizsgombóc, marinara szósz',
      price: '2100 Ft',
      image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop',
    },
  ],
  pasta: [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Tojás, pancetta, pecorino sajt',
      price: '3200 Ft',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Penne Arrabbiata',
      description: 'Csípős paradicsom szósz, fokhagyma',
      price: '2900 Ft',
      image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Tagliatelle al Tartufo',
      description: 'Friss szarvasgomba, vaj, parmezán',
      price: '4500 Ft',
      image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Lasagne Bolognese',
      description: 'Rétegelt tészta, bolognai ragu, besamel',
      price: '3500 Ft',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=100&h=100&fit=crop',
    },
  ],
  pizza: [
    {
      id: 1,
      name: 'Margherita',
      description: 'Paradicsom, mozzarella, bazsalikom',
      price: '2600 Ft',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Quattro Formaggi',
      description: 'Mozzarella, gorgonzola, parmezán, ricotta',
      price: '3400 Ft',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Diavola',
      description: 'Csípős szalámi, mozzarella, chili',
      price: '3100 Ft',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Prosciutto e Rucola',
      description: 'Pármai sonka, rukkola, parmezán',
      price: '3600 Ft',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop',
    },
  ],
  desserts: [
    {
      id: 1,
      name: 'Tiramisu',
      description: 'Mascarpone, babapiskóta, kávé',
      price: '1800 Ft',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Panna Cotta',
      description: 'Vaníliás tejszínhab, erdei gyümölcs',
      price: '1600 Ft',
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Cannoli Siciliani',
      description: 'Ricottás töltelék, pisztácia',
      price: '1900 Ft',
      image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Gelato Trio',
      description: 'Három gombóc olasz fagylalt',
      price: '1400 Ft',
      image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=100&h=100&fit=crop',
    },
  ],
};

// Kapcsolati információk
export const CONTACT_INFO = {
  address: 'Budapest, Andrássy út 12.',
  phone: '+36 1 234 5678',
  email: 'info@platera.hu',
  hours: 'H-V: 11:00 - 23:00',
};
