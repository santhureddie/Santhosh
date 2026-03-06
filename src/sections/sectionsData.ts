export type Section = {
  key: string;
  title: string;
  shortLabel: string;
  description: string;
  items: string[];
  position: [number, number];
};

export const sections: Section[] = [
  {
    key: 'about',
    title: 'Pit Lane Garage — About Me',
    shortLabel: 'About',
    description: 'Backend and Cloud Software Engineer focused on scalable, resilient systems.',
    items: ['Oracle - Member of Technical Staff', 'Node.js, TypeScript, Python', 'OCI + AWS + Event-driven architecture'],
    position: [22, 0]
  },
  {
    key: 'projects',
    title: 'Engineering Lab — Projects',
    shortLabel: 'Projects',
    description: 'Production-focused and experimental builds across AI and cloud systems.',
    items: ['Car Genie multi-agent platform', 'Cloud food ordering app', 'Skill Highlighter Chrome extension'],
    position: [0, 14]
  },
  {
    key: 'skills',
    title: 'Sponsor Boards — Skills',
    shortLabel: 'Skills',
    description: 'Core stack powering modern backend and cloud products.',
    items: ['JavaScript, TypeScript, Python', 'Node.js, Express, SQL, Docker', 'OCI, AWS, CI/CD, Monitoring'],
    position: [-22, 0]
  },
  {
    key: 'contact',
    title: 'Race Control Tower — Contact',
    shortLabel: 'Contact',
    description: 'Let’s collaborate on backend, platform, and cloud engineering opportunities.',
    items: ['santhoshkumarreddyjampana@gmail.com', 'linkedin.com/in/santhoshjampana', 'github.com/santhureddie'],
    position: [0, -14]
  }
];
