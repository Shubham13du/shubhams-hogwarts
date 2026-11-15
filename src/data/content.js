// =====================================================================
// All editable portfolio content lives in this file.
// Anything set to null is a placeholder: the site shows a friendly
// "add this" hint until you fill it in.
// Put extra images in /public/images/ and reference them like
// '/images/certificates/olympiad.jpg'.
// =====================================================================

export const PROFILE = {
  name: 'Shubham',
  tagline: 'Where curiosity becomes craft',
  portraitSrc: '/images/shubham.jpeg',
  heroImageSrc: '/images/hogwarts.png',
};

// Order here = order of the orbit buttons (clockwise from top-left).
export const NAV_ITEMS = [
  {
    id: 'about',
    label: 'About Me',
    icon: '📜',
    title: 'The Wizard Behind the Wand',
    subtitle: 'A short story about who I am, what I love and how I think.',
  },
  {
    id: 'journey',
    label: 'My Journey',
    icon: '🧭',
    title: 'The Chapters of My Story',
    subtitle: 'From school desks to engineering workshops, one chapter at a time.',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '🦉',
    title: 'Send an Owl',
    subtitle: 'Write to me. Every owl finds its way.',
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: '🏆',
    title: 'Moments Worth Remembering',
    subtitle: 'Results, recognition and the milestones behind them.',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '🔮',
    title: "Things I've Brought to Life",
    subtitle: 'Experiments, designs and builds, past and yet to come.',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: '⚗️',
    title: 'My Magical Arsenal',
    subtitle: 'The tools, crafts and subjects I carry with me.',
  },
];

// ---------------------------------------------------------------------
// ABOUT ME
// NOTE: the intro and pillar texts are DRAFT copy written only from the
// facts you shared. Edit them so they sound like you.
// ---------------------------------------------------------------------
export const ABOUT = {
  intro: [
    "I'm Shubham. My path has led me to Mechanical Engineering at BIT Sindri, after years of school, long months of JEE preparation and a steady curiosity about how things are designed, built and made to work.",
    'Alongside engineering, I love giving shape to ideas through graphic design, writing, poetry and visualisation. This portfolio is the place where those two worlds meet.',
  ],
  facts: [
    { label: 'Name', value: 'Shubham' },
    { label: 'Path', value: 'Mechanical Engineering, BIT Sindri (2026)' },
    { label: 'Exploring', value: 'Design, programming and engineering' },
    { label: 'Creative side', value: 'Writing, poetry and visualisation' },
    { label: 'Currently learning', value: 'JavaScript, CAD/CAE and GitHub' },
  ],
  pillars: [
    {
      icon: '🕯️',
      title: 'Personality',
      text: 'Curious and patient. I like to understand a problem properly before I try to solve it.',
    },
    {
      icon: '📚',
      title: 'Interests',
      text: 'Engineering, design and programming, with a soft spot for writing and poetry.',
    },
    {
      icon: '🎨',
      title: 'Creativity',
      text: 'I think in words and images, which is why graphic design, poetry and visualisation come naturally to me.',
    },
    {
      icon: '🧩',
      title: 'Analytical Thinking',
      text: 'Engineering and entrance-exam preparation taught me to break big problems into small, logical steps.',
    },
    {
      icon: '🌱',
      title: 'Continuous Learning',
      text: 'Right now I am learning JavaScript, CAD/CAE and GitHub, and this website is part of that practice.',
    },
  ],
};

// ---------------------------------------------------------------------
// MY JOURNEY (chronological)
// period: null shows an "Add years" hint. Fill in real years when ready.
// current: true highlights the latest chapter.
// ---------------------------------------------------------------------
export const JOURNEY = {
  entries: [
    {
      id: 'ram-rudra',
      kind: 'School',
      title: 'Ram Rudra +2 High School',
      period: null,
      text: 'A chapter of my school education, where the foundation for everything that followed was built.',
    },
    {
      id: 'vk-majdoor',
      kind: 'School',
      title: 'VK Majdoor Inter College',
      period: null,
      text: 'The next step in my schooling, building towards the engineering entrance path.',
    },
    {
      id: 'jee',
      kind: 'Entrance journey',
      title: 'JEE Preparation & Engineering Entrance Journey',
      period: null,
      text: 'Long months of focused preparation for the engineering entrance exams, a journey that led to qualifying the JEE Advanced cutoff.',
    },
    {
      id: 'bit-sindri',
      kind: 'University',
      title: 'BIT Sindri, Mechanical Engineering',
      period: '2026',
      text: 'Mechanical Engineering at BIT Sindri, the place where my engineering foundations are being built.',
    },
    {
      id: 'now',
      kind: 'Present',
      title: 'Exploring Design, Programming & Engineering',
      period: 'Now',
      current: true,
      text: 'Learning JavaScript, CAD/CAE and GitHub, and bringing design and engineering together.',
    },
  ],
};

// ---------------------------------------------------------------------
// ACHIEVEMENTS
// score: { obtained, total } draws a percentage ring (computed automatically).
// detail: null shows the `hint` text as an editable placeholder.
// ---------------------------------------------------------------------

export const ACHIEVEMENTS = {
  records: [
    {
      id: 'olympiad',
      icon: '🥈',
      value: '2nd',
      label: 'Jharkhand State Olympiad',
      detail: 'Second position at the state level.',
      hint: '',
    },
    {
      id: 'class10',
      icon: '📘',
      value: '473/500',
      label: 'Class 10',
      score: { obtained: 472, total: 500 },
      detail: null,
      hint: '',
    },
    {
      id: 'class12',
      icon: '📗',
      value: '444/500',
      label: 'Class 12',
      score: { obtained: 444, total: 500 },
      detail: null,
      hint: '',
    },
    {
      id: 'jee-advanced',
      icon: '🎓',
      value: 'Qualified',
      label: 'JEE Advanced Cutoff',
      detail: 'Qualified the JEE Advanced cutoff.',
      hint: '',
    },
    {
      id: 'entrance',
      icon: '🎯',
      value: '5759',
      label: 'WBJEE GMR Rank',
      detail: 'West Bengal Joint Entrance Examination.',
      hint: '',
    },
  ],

  recognitionNote:
    'A collection of certificates and newspaper recognitions from my journey.',

  recognition: [
    {
      id: 'cert-olympiad',
      type: 'Certificate',
      caption: 'Jharkhand State Olympiad — 2nd Position',
      image: '/images/recognition/olympiad-certificate.jpeg',
    },
   
    {
      id: 'newspaper-1',
      type: 'Newspaper',
      caption: 'Newspaper Recognition — 1',
      image: '/images/recognition/newspaper-1.jpeg',
    },
    {
      id: 'newspaper-2',
      type: 'Newspaper',
      caption: 'Newspaper Recognition — 2',
      image: '/images/recognition/newspaper-2.jpeg',
    },
  ],
};

// ---------------------------------------------------------------------
// PROJECTS
// image / github / live: null hides or placeholders them.
// ---------------------------------------------------------------------
export const PROJECTS = {
  projects: [
    {
      id: 'hogwarts-portfolio',
      title: "Shubham's Hogwarts",
      category: 'Technical',
      status: 'In progress',
      description:
        'This very website: an interactive, Hogwarts-inspired portfolio with orbiting navigation, parchment sections and a map that keeps growing.',
      tags: ['React', 'Vite', 'CSS'],
      image: '/images/hor/hor1.png',
      github: null,
      live: null,
    },
    {
      id: 'posters',
      title: 'Graphic Design & Poster Work',
      category: 'Creative',
      status: null,
      description:
        'Posters and visual designs where ideas become layout, colour and typography.',
      tags: ['Canva', 'Graphic Design'],
      image: '/images/hor/hor3.jpeg',
      github: null,
      live: null,
    },
    {
      id: 'cad-cae',
      title: 'Engineering, CAD & CAE Projects',
      category: 'Engineering',
      status: 'Coming soon',
      description:
        'Future projects that bring mechanical engineering fundamentals together with CAD and CAE tools. They will appear here as they are built.',
      tags: ['CAD', 'CAE', 'Mechanical Engineering'],
      image: '/images/hor/hor2.jpg',
      github: null,
      live: null,
    },
  ],
};

// ---------------------------------------------------------------------
// SKILLS (no proficiency levels, by design)
// ---------------------------------------------------------------------
export const SKILLS = {
  categories: [
    { id: 'design', name: 'Design', icon: '🎨', items: ['Canva', 'Graphic Design'] },
    { id: 'development', name: 'Development', icon: '⌨️', items: ['HTML', 'CSS', 'Basic Python'] },
    { id: 'creative', name: 'Creative', icon: '🪶', items: ['Writing', 'Poetry', 'Visualisation'] },
    { id: 'engineering', name: 'Engineering', icon: '⚙️', items: ['Mechanical Engineering fundamentals'] },
    { id: 'learning', name: 'Currently Learning', icon: '🔭', learning: true, items: ['JavaScript', 'CAD/CAE', 'GitHub'] },
  ],
};

// ---------------------------------------------------------------------
// CONTACT
// To activate a card, set BOTH value and href. Examples:
//   email:     value: 'you@example.com',        href: 'mailto:you@example.com'
//   linkedin:  value: 'linkedin.com/in/you',    href: 'https://linkedin.com/in/you'
// ---------------------------------------------------------------------

export const CONTACT = {
  intro: 'Have an idea, a question or just a friendly hello? Send an owl my way.',
  methods: [
    {
      id: 'email',
      label: 'Email',
      icon: '✉️',
      value: 'duttashubham486@gmail.com',
      href: 'mailto:duttashubham486@gmail.com',
      placeholder: 'duttashubham486@gmail.com'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: '💼',
      value: 'LinkedIn Profile',
      href: 'https://www.linkedin.com/in/shubham-dutta-6619a4432/',
      placeholder: 'linkedin.com/in/shubham-dutta-6619a4432'
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: '🐙',
      value: 'GitHub Profile',
      href: 'https://github.com/Shubham13du',
      placeholder: 'github.com/Shubham13du'
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: '📸',
      value: 'Instagram Profile',
      href: 'https://www.instagram.com/shubhamdutta15/',
      placeholder: 'instagram.com/shubhamdutta15'
    },
  ],
};


// Used by the Hogwarts map.
export const DESTINATIONS = [
  {
    id: 'character',
    title: 'Know Your Character',
    icon: '🎩',
    blurb: 'A personality quiz that matches you with a figure from the wizarding world.',
  },
  {
    id: 'name',
    title: 'The Magic Within My Name',
    icon: '✨',
    blurb: 'Seven letters, seven characters, one personality. Tap each letter to reveal its magic.',
  },
];