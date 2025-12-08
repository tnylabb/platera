/**
 * Navigation Items
 * Fejléc navigációs elemei
 */
export const NAVIGATION_ITEMS = [
  { label: 'Menü', href: '#menu' },
  { label: 'Rólunk', href: '#story' },
  { label: 'Kapcsolat', href: '#contact' },
];

/**
 * Menu Categories
 * Étlap kategóriák a tab navigációhoz
 */
export const MENU_CATEGORIES = [
  { id: 'appetizers', label: 'Előételek' },
  { id: 'pasta', label: 'Tészták' },
  { id: 'pizza', label: 'Pizzák' },
  { id: 'desserts', label: 'Desszertek' },
];

/**
 * Menu Items
 * Étlap tételek kategóriánként csoportosítva
 */
export const MENU_ITEMS = {
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
  appetizers: [
    {
      id: 5,
      name: 'Bruschetta',
      description: 'Pirított kenyér, paradicsom, bazsalikom',
      price: '1800 Ft',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=100&h=100&fit=crop',
    },
    {
      id: 6,
      name: 'Caprese Saláta',
      description: 'Mozzarella, paradicsom, friss bazsalikom',
      price: '2400 Ft',
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=100&h=100&fit=crop',
    },
    {
      id: 7,
      name: 'Carpaccio',
      description: 'Vékony szeletelt marha, rukkola, parmezán',
      price: '3200 Ft',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100&h=100&fit=crop',
    },
    {
      id: 8,
      name: 'Vitello Tonnato',
      description: 'Borjúhús tonhalas szósszal',
      price: '3400 Ft',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
    },
  ],
  pizza: [
    {
      id: 9,
      name: 'Margherita',
      description: 'Paradicsom, mozzarella, bazsalikom',
      price: '2600 Ft',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&h=100&fit=crop',
    },
    {
      id: 10,
      name: 'Quattro Formaggi',
      description: 'Négy sajt keveréke',
      price: '3200 Ft',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
    },
    {
      id: 11,
      name: 'Diavola',
      description: 'Pikáns szalámi, chili',
      price: '3000 Ft',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100&h=100&fit=crop',
    },
    {
      id: 12,
      name: 'Prosciutto e Funghi',
      description: 'Sonka, gomba, mozzarella',
      price: '3400 Ft',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop',
    },
  ],
  desserts: [
    {
      id: 13,
      name: 'Tiramisu',
      description: 'Klasszikus olasz desszert',
      price: '1800 Ft',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=100&h=100&fit=crop',
    },
    {
      id: 14,
      name: 'Panna Cotta',
      description: 'Vaníliás tejszínhab, erdei gyümölcs',
      price: '1600 Ft',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop',
    },
    {
      id: 15,
      name: 'Gelato',
      description: 'Házi készítésű olasz fagylalt',
      price: '1200 Ft',
      image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=100&h=100&fit=crop',
    },
    {
      id: 16,
      name: 'Cannoli',
      description: 'Szicíliai töltött tészta',
      price: '1400 Ft',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop',
    },
  ],
};

/**
 * Statistics
 * Étterem statisztikák a Történetünk szekcióhoz
 */
export const STATS = [
  { value: '2025', label: 'Alapítás éve' },
  { value: '15+', label: 'Csapattagok' },
  { value: '50+', label: 'Fogás' },
];

/**
 * Contact Information
 * Kapcsolati adatok
 */
export const CONTACT_INFO = [
  {
    icon: 'location',
    title: 'Cím',
    lines: ['1134 Budapest,', 'Váci út 21.'],
  },
  {
    icon: 'phone',
    title: 'Telefon',
    lines: ['+36 1 234 5678', 'Asztalfoglalás'],
  },
  {
    icon: 'clock',
    title: 'Nyitvatartás',
    lines: ['H-V: 12:00 - 23:00', 'Szo-Vas: 11:00 - 00:00'],
  },
  {
    icon: 'email',
    title: 'E-mail',
    lines: ['info@platera.hu', 'Kapcsolat'],
  },
];
