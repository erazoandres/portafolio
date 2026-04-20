export const sectionsNav = [
  { id: 'hero', icon: 'fas fa-home', label: 'Inicio' },
  { id: 'about', icon: 'fas fa-user', label: 'Sobre Mí' },
  { id: 'projects', icon: 'fas fa-code', label: 'Proyectos' },
  { id: 'skills', icon: 'fas fa-chart-bar', label: 'Skills' },
  { id: 'contact', icon: 'fas fa-paper-plane', label: 'Contacto' },
];

export const projectsData = [
  {
    title: 'Audit Studio',
    file: 'audit-studio/',
    image: '/assets/nexus.png',
    link: 'https://erazoandres.github.io/Audit-Studio/index.html',
    desc: 'Centro de control para gestión de grupos y análisis de pagos.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Kinetic Social',
    file: 'kinetic-social/',
    image: '/assets/kinect.png',
    link: 'https://erazoandres.github.io/KINETIC-SOCIAL/',
    desc: 'Plataforma para proyectos sociales e impacto comunitario.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Quantum Notes',
    file: 'quantum-notes/',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&auto=format&fit=crop',
    link: null,
    desc: 'App de notas con encriptación avanzada y sincronización real.',
    tags: ['React', 'Firebase'],
  },
  {
    title: 'MapBuilder',
    file: 'map-builder/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    link: 'https://erazoandres.github.io/mapBuilder/',
    desc: 'Editor de niveles por capas para videojuegos.',
    tags: ['Python', 'PgZero'],
  },
  {
    title: 'PideValle',
    file: 'pide-valle/',
    image: '/assets/pidevalle.png',
    link: null,
    desc: 'Delivery integral para clientes, negocios y repartidores.',
    tags: ['Node.js', 'MongoDB', 'Express'],
  },
];

export const skillGroupsData = [
  {
    file: 'frontend.config.js',
    skills: [{ name: 'React' }, { name: 'JavaScript' }, { name: 'Vue.js' }, { name: 'HTML/CSS' }],
  },
  {
    file: 'backend.env',
    skills: [{ name: 'Node.js' }, { name: 'Python' }, { name: 'SQL' }, { name: 'MongoDB' }],
  },
  {
    file: 'design.scss',
    skills: [{ name: 'UI/UX' }, { name: 'Figma' }],
  },
  {
    file: 'devops.yml',
    skills: [{ name: 'Git' }, { name: 'Docker' }, { name: 'Linux' }],
  },
];

export const heroLinesData = [
  { type: 'comment', text: '// Iniciando sistema...' },
  { type: 'cmd', text: 'whoami' },
  { type: 'output', text: 'Andrés Erazo — Full Stack Developer' },
  { type: 'cmd', text: 'cat stack.txt' },
  { type: 'output-secondary', text: 'React · Vue · Node.js · Python' },
  { type: 'cmd', text: 'echo $STATUS' },
  { type: 'output', text: 'Disponible para nuevos retos' },
];
