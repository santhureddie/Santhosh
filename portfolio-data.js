export const profile = {
  name: 'Santhosh Kumar Reddy Jampana',
  headline: 'Backend & Cloud Software Engineer',
  location: 'Redwood City, CA',
  email: 'santhoshkumarreddyjampana@gmail.com',
  phone: '+1 (913) 263-8981',
  linkedin: 'https://www.linkedin.com/in/santhoshjampana',
  github: 'https://github.com/santhureddie',
  portfolio: 'https://santhureddie.github.io/myportfolio/',
  summary:
    'Backend and Cloud Software Engineer specializing in scalable serverless systems, IoT automation pipelines, and real-time event-driven architectures across OCI and AWS.'
};

export const checkpoints = [
  {
    id: 'intro',
    title: '🏁 Driver Profile',
    description:
      'MS in Computer Science graduate with production experience across cloud backend engineering, telecom systems, and AI-powered voice workflows.',
    bullets: [
      'Current Role: Member of Technical Staff at Oracle (Jul 2025 – Present)',
      'Core Focus: Node.js, Python, distributed cloud systems, reliability engineering',
      'Open To: Backend / Cloud Software Engineer opportunities'
    ],
    actions: [
      { label: 'Email', href: 'mailto:santhoshkumarreddyjampana@gmail.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/santhoshjampana' },
      { label: 'GitHub', href: 'https://github.com/santhureddie' }
    ]
  },
  {
    id: 'oracle',
    title: '☁️ Experience: Oracle',
    description:
      'Designed cloud-native IoT credentialing and event pipelines on OCI with strong security and fault-tolerance guarantees.',
    bullets: [
      'Automated IoT credential lifecycle with OCI Functions, Vault, Object Storage and Python, reducing onboarding time by 90%+',
      'Built secure Node.js secret-management service using OCI Vault + IAM and asymmetric cryptography; reduced config errors by 70%',
      'Implemented resilient Object Storage polling with retry, exponential backoff, and robust failure handling'
    ],
    actions: [{ label: 'Oracle Cloud Certifications', href: 'https://education.oracle.com' }]
  },
  {
    id: 'voicylabs',
    title: '🎙️ Experience: Voicy Labs',
    description:
      'Built a real-time AI voice assistant backend that handles calls, STT, LLM reasoning, and TTS responses.',
    bullets: [
      'Developed Node.js/Express backend for multi-turn voice interactions and call orchestration',
      'Added fault-tolerant async workflows with retries, fallbacks, and state tracking',
      'Improved latency by 40% with modular services, observability, and optimization'
    ]
  },
  {
    id: 'skills',
    title: '🧠 Skills Garage',
    description: 'Stack I use to ship secure and scalable systems quickly.',
    bullets: [
      'Languages: JavaScript, TypeScript, Python, Node.js, SQL, Java, C++, Erlang',
      'Cloud/Infra: OCI (IAM, IoT, Functions, API Gateway), AWS (EC2, Lambda, S3), Linux, Docker, Podman',
      'Engineering: Event-driven design, async workflows, retry logic, caching, CI/CD, observability'
    ]
  },
  {
    id: 'projects',
    title: '🚀 Featured Projects',
    description: 'Hands-on systems spanning AI agents, browser tooling, and full-stack cloud apps.',
    bullets: [
      'Car-Genie: CrewAI + Flask multi-agent car buying automation with marketplace analysis',
      'Skill Highlighter: Chrome extension that matches resume keywords in job descriptions',
      'Cloud Food Ordering App: Next.js + Node.js + PostgreSQL on AWS with 30% backend response improvement'
    ],
    actions: [
      { label: 'Portfolio', href: 'https://santhureddie.github.io/myportfolio/' },
      { label: 'GitHub Repositories', href: 'https://github.com/santhureddie' }
    ]
  },
  {
    id: 'education',
    title: '🎓 Education & Certifications',
    description: 'Academic foundation plus cloud credentials focused on production readiness.',
    bullets: [
      'M.S. Computer Science — University of Central Missouri (CGPA 3.7/4.0)',
      'B.E. ECE — Vidya Jyothi Institute of Technology (CGPA 3.6/4.0)',
      'OCI Certified Foundations Associate + OCI Certified AI Foundations Associate'
    ]
  }
];
