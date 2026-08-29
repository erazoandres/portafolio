export const sectionsNav = [
  { id: 'hero', icon: 'fas fa-home', label: 'Inicio' },
  { id: 'about', icon: 'fas fa-user', label: 'Sobre Mí' },
  { id: 'projects', icon: 'fas fa-code', label: 'Proyectos' },
  { id: 'services', icon: 'fas fa-server', label: 'Servicios' },
  { id: 'skills', icon: 'fas fa-chart-bar', label: 'Skills' },
  { id: 'contact', icon: 'fas fa-paper-plane', label: 'Contacto' },
];

export const projectsData = [
  {
    title: 'SpriteCreator',
    file: 'sprite-creator/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    link: 'https://erazoandres.github.io/SpriteCreator/',
    github: 'https://github.com/erazoandres/SpriteCreator',
    desc: 'Una web app interactiva para crear y personalizar personajes 2D para tus videojuegos.',
    tags: ['JavaScript', 'Canvas', 'GameDev'],
  },
  {
    title: 'ListCheckTutor',
    file: 'list-check-tutor/',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop',
    link: 'https://erazoandres.github.io/ListCheckTutor/',
    github: 'https://github.com/erazoandres/ListCheckTutor',
    desc: 'Una lista interactiva para ayudarte a cumplir tus objetivos de calidad y verificación en clases.',
    tags: ['JavaScript', 'HTML5', 'EdTech'],
  },
  {
    title: 'SpritesLocker',
    file: 'sprites-locker/',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    link: null,
    github: 'https://github.com/erazoandres/SpritesLocker',
    desc: 'Sistema de gestión y almacenamiento de sprites y recursos gráficos para videojuegos.',
    tags: ['JavaScript', 'GameDev', 'Storage'],
  },
  {
    title: 'Audit Studio',
    file: 'audit-studio/',
    image: '/assets/nexus.webp',
    link: 'https://erazoandres.github.io/Audit-Studio/index.html',
    github: 'https://github.com/erazoandres/Audit-Studio',
    desc: 'Centro de control para gestión de grupos y análisis de pagos.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Kinetic Social',
    file: 'kinetic-social/',
    image: '/assets/kinect.webp',
    link: 'https://erazoandres.github.io/KINETIC-SOCIAL/',
    github: 'https://github.com/erazoandres/KINETIC-SOCIAL',
    desc: 'Plataforma para proyectos sociales e impacto comunitario.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Quantum Notes',
    file: 'quantum-notes/',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop',
    link: null,
    github: null,
    desc: 'App de notas con encriptación avanzada y sincronización real.',
    tags: ['React', 'Firebase'],
  },
  {
    title: 'MapBuilder',
    file: 'map-builder/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    link: 'https://erazoandres.github.io/mapBuilder/',
    github: 'https://github.com/erazoandres/mapBuilder',
    desc: 'Editor de niveles por capas para videojuegos.',
    tags: ['Python', 'PgZero'],
  },
  {
    title: 'PideValle',
    file: 'pide-valle/',
    image: '/assets/pidevalle.webp',
    link: null,
    github: null,
    desc: 'Delivery integral para clientes, negocios y repartidores.',
    tags: ['Node.js', 'MongoDB', 'Express'],
  },
  {
    title: 'TutorAI',
    file: 'tutorai/',
    image: '/assets/tutorai-embedded.svg',
    link: 'https://andreserazotutorai.vercel.app/',
    github: null,
    desc: 'Plataforma educativa dirigida a estudiantes de grados 5 a 11. TutorAI ofrece un tutor guiado e interactivo que facilita el aprendizaje y el autoaprendizaje mediante rutas de estudio sencillas, lecciones estructuradas y recursos prácticos. Diseñado para que el alumnado avance de manera autónoma y comprensible, con contenido adaptado a su nivel y seguimiento del progreso.',
    tags: ['React', 'Vercel', 'AI'],
  },
];

export const achievementsData = [
  {
    icon: 'fas fa-trophy',
    title: 'Finalista Hackathon 2023',
    desc: 'Tercer lugar en Hackathon de Innovación Tecnológica Ambiental DATIC Cali 2023.',
  },
  {
    icon: 'fas fa-chalkboard-teacher',
    title: 'Docencia',
    desc: 'Profesor de desarrollo de Software en Kodland desde 2023.',
  },
  {
    icon: 'fas fa-microphone',
    title: 'Panelista Invitado',
    desc: 'Participación como Panelista en Hackathon CIADET Cali 2023.',
  },
];

export const productionStackData = {
  title: 'Stack de Producción',
  description: 'Mi metodología se basa en la velocidad y el rendimiento. Utilizo React 19 y Vite para el core, GSAP para experiencias inmersivas, y n8n para orquestar la inteligencia de negocio.',
  highlights: ['High Performance', 'Scalable Architecture', 'AI-Driven Workflows']
};

export const skillGroupsData = [
  {
    file: 'frontend.config.js',
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'JavaScript' },
      { name: 'Astro' },
      { name: 'HTML/CSS' }
    ],
  },
  {
    file: 'backend.env',
    skills: [
      { name: 'Node.js' },
      { name: 'Supabase' },
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'MongoDB' }
    ],
  },
  {
    file: 'design.scss',
    skills: [{ name: 'UI/UX' }, { name: 'Figma' }],
  },
  {
    file: 'devops.yml',
    skills: [{ name: 'Git' }, { name: 'Docker' }, { name: 'Linux' }],
  },
  {
    file: 'intelligence.json',
    skills: [{ name: 'AI Agents' }, { name: 'n8n Workflows' }, { name: 'Slack APIs' }, { name: 'Google Workspace' }],
  },
];

export const heroLinesData = [
  { type: 'comment', text: '// Iniciando sistema...' },
  { type: 'cmd', text: '¿quien soy?' },
  { type: 'output', text: 'Andrés Erazo — Senior Frontend Engineer' },
  { type: 'cmd', text: '¿qué ofrezco?' },
    { type: 'output-secondary', text: 'Web Apps · Android Apps · AI Agents · n8n Automation · APIs · Consultancy · Websites' },
  { type: 'cmd', text: 'echo $STATUS' },
  { type: 'output', text: 'Disponible solo para proyectos ambiciosos y muy cool 😎' },
];

export const servicesData = [
  {
    title: 'Páginas web',
    file: 'websites.md',
    icon: 'fas fa-globe',
    tagline: 'Presencia & conversión',
    desc: 'Landing pages, sitios corporativos y tiendas con foco en UX, SEO y rendimiento. Entrego sitios responsivos y optimizados para tráfico real.',
    cta: 'Solicitar presupuesto',
    projectsLink: null,
    features: ['Diseño responsive', 'SEO técnico', 'CMS cuando aplica'],
  },
  {
    title: 'Aplicaciones',
    file: 'apps.md',
    icon: 'fas fa-mobile-alt',
    tagline: 'Productos interactivos',
    desc: 'Web apps y móviles con arquitectura escalable, APIs bien diseñadas y despliegue continuo. Priorizo calidad de producto y experiencia de usuario.',
    cta: 'Contáctame — hablemos',
    projectsLink: null,
    features: ['APIs REST/GraphQL', 'Testing & CI/CD', 'Despliegue escalable'],
  },
  {
    title: 'Automatizaciones',
    file: 'automation.yml',
    icon: 'fas fa-robot',
    tagline: 'Flujos que ahorran tiempo',
    desc: 'Integraciones, bots y orquestación (n8n, Zapier, scripts a medida) para reducir errores manuales y acelerar operaciones.',
    cta: 'Solicitar automatización',
    projectsLink: null,
    features: ['n8n / Zapier', 'Integración de APIs', 'Monitoreo y alertas'],
  },
  {
    title: 'Portales para negocio',
    file: 'portals.json',
    icon: 'fas fa-building',
    tagline: 'Gestión & datos',
    desc: 'Dashboards, CRMs y portales de clientes con seguridad y roles. Construyo paneles que ayudan a tomar decisiones con datos reales.',
    cta: 'Ver opciones',
    projectsLink: null,
    features: ['Roles y permisos', 'Analítica integrada', 'Integración con ERPs'],
  },
];
