/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Phone,
  Briefcase, 
  GraduationCap, 
  Code2, 
  Award, 
  Heart, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  ChevronRight,
  Menu,
  X,
  Download,
  Terminal,
  Cpu,
  ShieldCheck,
  Globe,
  Sparkles,
  MessageSquare,
  Zap
} from 'lucide-react';

// Fireworks Component
const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const colors = ['#f97316', '#fb923c', '#fdba74', '#ffffff'];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.5);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.02) createFirework();

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />;
};

// Animated Character Component
const AnimatedCharacter = () => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] opacity-20 pointer-events-none z-0 hidden lg:block"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path fill="url(#grad1)" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,89.7,-0.5C88.9,14.7,82.2,29.4,73.1,42.1C64,54.8,52.5,65.5,39.1,72.7C25.7,79.9,10.4,83.6,-4.1,83.6C-18.6,83.6,-37.2,79.9,-51.1,71.1C-65,62.3,-74.2,48.4,-80.1,33.3C-86,18.2,-88.6,1.9,-86.3,-13.7C-84,-29.3,-76.8,-44.2,-65.4,-54.6C-54,-65,-38.4,-70.9,-24.1,-75.6C-9.8,-80.3,3.2,-83.8,17.4,-82.1C31.6,-80.4,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
        <motion.g
          animate={{
            y: [0, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Stylized Robot/Character Head */}
          <rect x="70" y="60" width="60" height="50" rx="10" fill="#18181b" stroke="#f97316" strokeWidth="2" />
          <rect x="80" y="75" width="10" height="10" rx="2" fill="#f97316" className="animate-pulse" />
          <rect x="110" y="75" width="10" height="10" rx="2" fill="#f97316" className="animate-pulse" />
          <path d="M85 95 Q100 105 115 95" stroke="#f97316" strokeWidth="2" fill="none" />
          {/* Antenna */}
          <line x1="100" y1="60" x2="100" y2="40" stroke="#f97316" strokeWidth="2" />
          <circle cx="100" cy="40" r="4" fill="#f97316" />
        </motion.g>
      </svg>
    </motion.div>
  );
};

const sections = [
  { id: 'about', label: 'About', icon: UserIcon },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'awards', label: 'Awards', icon: Award },
];

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsHireModalOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sectionElements = sections.map(s => document.getElementById(s.id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <Fireworks />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 shimmer">
            <span className="text-black font-bold text-xl">TO</span>
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:block">Taiwo Oladele</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`text-sm font-medium transition-all hover:text-orange-500 relative py-2 ${
                activeSection === section.id ? 'text-orange-500' : 'text-zinc-400'
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                />
              )}
            </button>
          ))}
          <button 
            onClick={() => setIsHireModalOpen(true)}
            className="px-6 py-2.5 bg-orange-500 text-black rounded-full text-sm font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 shimmer"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-[#050505] z-40 lg:hidden p-6 flex flex-col gap-6"
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="text-2xl font-bold text-left flex items-center justify-between group"
              >
                <span className={activeSection === section.id ? 'text-orange-500' : 'text-zinc-400'}>
                  {section.label}
                </span>
                <ChevronRight className="text-zinc-800 group-hover:text-orange-500 transition-colors" />
              </button>
            ))}
            <button 
              onClick={() => {
                setIsHireModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="mt-auto w-full py-4 bg-orange-500 text-black rounded-2xl text-lg font-bold shadow-xl shadow-orange-500/20 shimmer"
            >
              Hire Me Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Hero Section / About */}
        <section id="about" className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
          <AnimatedCharacter />
          
          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3 h-3" />
              Available for new projects
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter mb-8"
            >
              Taiwo <span className="text-orange-500">Oladele</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-6 text-zinc-400 mb-12"
            >
              <div className="flex items-center gap-2 group cursor-default">
                <MapPin className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm group-hover:text-zinc-200 transition-colors">N015 milionaire qrts, Byhazhin Kubwa, Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Mail className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <a href="mailto:taiwodele88@gmail.com" className="text-sm hover:text-orange-500 transition-colors">taiwodele88@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <a href="tel:09054755699" className="text-sm hover:text-orange-500 transition-colors">09054755699</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl"
            >
              <p className="font-medium text-white">
                I'm a Software developer, Started my I.T career in 2015.
              </p>
              <p>
                I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 mt-12"
            >
              <button 
                onClick={() => scrollTo('experience')}
                className="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 group"
              >
                View Experience
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2">
                <a href="#" className="p-4 rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-all text-zinc-400 hover:text-orange-500">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-4 rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-all text-zinc-400 hover:text-orange-500">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-4 rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-all text-zinc-400 hover:text-orange-500">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="px-6 md:px-12 lg:px-24 py-32 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experience</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-12">
              {[
                {
                  role: "Full Stack Developer",
                  company: "Premegage Technology Solution",
                  position: "Executive Director, ICT.",
                  period: "July 2023 - Present",
                  desc: ""
                },
                {
                  role: "Full Stack Developer",
                  company: "Tech Pro IT Consulting/Services LLC",
                  period: "January 2023 - Present",
                  desc: "designing user interactions on the company's websites, developing servers and databases for website functionality and coding for mobile platforms."
                },
                {
                  role: "Lead Web Developer",
                  company: "Konectin Tech",
                  period: "October 2022 - on contract",
                  desc: "lead a developer team on a project."
                },
                {
                  role: "Chief Technology Officer",
                  company: "JemadPay",
                  period: "December 3 - on contract",
                  desc: "head of technology, design website, defend the comnpany's server, and other IT related work."
                },
                {
                  role: "Chief Technology Officer",
                  company: "Fundme Capital",
                  period: "July 2022 - September 2022",
                  desc: "Lead a developers team in creating the company's website."
                },
                {
                  role: "Software Developer",
                  company: "Flycoded Technology",
                  position: "Founder",
                  period: "August 2015 - till date",
                  desc: ""
                }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative pl-6 md:pl-8 border-l-2 border-white/5 hover:border-orange-500 transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/10 group-hover:border-orange-500 transition-colors" />
                  <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/5 group-hover:border-orange-500/30 transition-all">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">{exp.role}</h3>
                        <p className="text-orange-500 font-medium">{exp.company}</p>
                        {exp.position && <p className="text-zinc-500 text-sm mt-1 italic">{exp.position}</p>}
                      </div>
                      <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-zinc-500 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm self-start">
                        {exp.period}
                      </span>
                    </div>
                    {exp.desc && <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl">{exp.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="px-6 md:px-12 lg:px-24 py-32 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Education</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  school: "Google Africa Developer Training Program",
                  degree: "Google Cloud",
                  status: "Certified",
                  period: "September 2022 - March 2023"
                },
                {
                  school: "IT NETWORKING",
                  degree: "TECH PRO LLC",
                  status: "Graduated",
                  period: "September 2022 - February 2023"
                },
                {
                  school: "Certied Ethicl Hacker",
                  degree: "Hack the Box",
                  status: "Certified",
                  period: "May 2020"
                },
                {
                  school: "Certied Penetration Tester",
                  degree: "Hack the Box",
                  status: "Certified",
                  period: "May 2020"
                },
                {
                  school: "IT Security Proffessional",
                  degree: "Cyber Phoenix (France)",
                  status: "Certified",
                  period: "January 2021"
                },
                {
                  school: "Kogi State Polytechnic Lokoja",
                  degree: "Higher National Diploma",
                  major: "Computer Science",
                  gpa: "GPA: 3.15",
                  period: "May 2016 - December 2021"
                },
                {
                  school: "Community High School",
                  degree: "Applied Science",
                  status: "Credit",
                  period: "August 2022 - May 2006"
                }
              ].map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl glass border border-white/5 hover:border-orange-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors" />
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all shimmer">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{edu.period}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{edu.school}</h3>
                  <p className="text-zinc-400 mb-1 relative z-10">{edu.degree}</p>
                  {edu.major && <p className="text-zinc-500 text-sm relative z-10">{edu.major}</p>}
                  {edu.gpa && <p className="text-orange-500 text-sm font-bold mt-2 relative z-10">{edu.gpa}</p>}
                  <div className="mt-4 inline-block px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 relative z-10">
                    {edu.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="px-6 md:px-12 lg:px-24 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Skills</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Programming Languages */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-orange-500">
                  <Terminal className="w-6 h-6" />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Languages</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">JAVASCRIPT</span>
                      <span className="text-zinc-500 text-xs">Expert</span>
                    </div>
                    <p className="text-zinc-500 text-sm italic">Framework: React native, React.js.</p>
                    <div className="h-1 w-full bg-white/5 rounded-full mt-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '95%' }}
                        viewport={{ once: true }}
                        className="h-full bg-orange-500 rounded-full" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">PHP</span>
                      <span className="text-zinc-500 text-xs">Expert</span>
                    </div>
                    <p className="text-zinc-500 text-sm italic">Framework: laravel, Codeigniter.</p>
                    <div className="h-1 w-full bg-white/5 rounded-full mt-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '90%' }}
                        viewport={{ once: true }}
                        className="h-full bg-orange-500 rounded-full" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">Python</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full mt-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        viewport={{ once: true }}
                        className="h-full bg-orange-500 rounded-full" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">R Language</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full mt-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '70%' }}
                        viewport={{ once: true }}
                        className="h-full bg-orange-500 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools & Workflow */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-orange-500">
                  <Cpu className="w-6 h-6" />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Workflow</h3>
                </div>
                <div className="grid gap-4">
                  {[
                    "Mobile-First, Responsive Design",
                    "Cross Browser Testing & Debugging",
                    "Cross Functional Teams",
                    "Agile Development & Scrum"
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 border border-white/5">
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">CMS</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Drupal", "WordPress"].map((cms, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">{cms}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specialized */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-orange-500">
                  <ShieldCheck className="w-6 h-6" />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Specialized</h3>
                </div>
                <div className="p-8 rounded-3xl bg-orange-500/5 border border-orange-500/20">
                  <h4 className="font-bold mb-4">Cyber Security</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Ethical hacking, Penetration Testing:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["CEH", "PenTest+", "Security+"].map((cert, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-orange-500 text-black text-[10px] font-bold">{cert}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
                  <h4 className="font-bold mb-2">UI/UX Design</h4>
                  <p className="text-zinc-500 text-sm italic">Figma</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="px-6 md:px-12 lg:px-24 py-32 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Interests</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-zinc-900 border border-white/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6" />
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Apart from being a Software developer, I enjoy most of my time being indoors playing games. on the pitch, I am a good football player.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 rounded-3xl bg-zinc-900 border border-white/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">
                    <Heart className="w-6 h-6" />
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    When forced outdoors, I visit a numbers of places, I am an aspiring chef, and I spend a large amount of my free time exploring the latest technology advancements in Software development industry.
                  </p>
                </motion.div>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/tech/800/800" 
                  alt="Interests" 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2">Exploring</p>
                  <h3 className="text-3xl font-bold">Latest Tech</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="px-6 md:px-12 lg:px-24 py-32 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Awards & Certifications</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-6">
              {[
                {
                  title: "Google Cloud Engineer",
                  issuer: "Google Africa Development Training Program",
                  date: "Issued March 2023",
                  id: "F2BBB521BA6AF2D"
                },
                {
                  title: "Introduction to Mobile App Development With Flutter",
                  issuer: "Alison - Empower",
                  date: "Issued Aug 2022",
                  id: "3917-24394954"
                },
                {
                  title: "Diploma in Google Ads",
                  issuer: "Alison - Empower Yourself",
                  date: "Issued Jul 2022",
                  id: "1898-24394954"
                },
                {
                  title: "Advanced Diploma in Computer Networks and Internet Protocol",
                  issuer: "Alison - Empower Yourself",
                  date: "Issued Jun 2022",
                  id: "2367-24394954"
                },
                {
                  title: "Facebook Advertising for Beginners",
                  issuer: "Alison - Empower Yourself",
                  date: "Issued Jul 2022",
                  id: "1928-24394954"
                },
                {
                  title: "CompTIA Security+ (Exam SY0-501)",
                  issuer: "Alison - Empower Yourself",
                  date: "Issued May 2022",
                  id: "1957-24394954"
                },
                {
                  title: "Diploma in Interconnecting Cisco Networking Devices Part 2 (ICND2) v3 CCNA",
                  issuer: "Alison - Empower Yourself",
                  date: "Issued May 2022",
                  id: "1932-24394954"
                },
                {
                  title: "Web Development with HTML and CSS for Beginners",
                  issuer: "Alison - Empower Yourself",
                  date: "Issued Apr 2022",
                  id: "3757-24394954"
                },
                {
                  title: "Google Ads - Measurement Certification",
                  issuer: "Google",
                  date: "Issued Mar 2023 · Expires Mar 2024",
                  id: ""
                }
              ].map((award, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-900 hover:border-orange-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100">{award.title}</h3>
                      <p className="text-zinc-500 text-sm">{award.issuer}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">{award.date}</p>
                    {award.id && <p className="text-zinc-600 text-[10px]">ID: {award.id}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center md:text-left relative">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-12 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 opacity-20"
            >
              <Zap className="w-8 h-8 text-orange-500" />
            </motion.div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">TO</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Taiwo Oladele</span>
            </div>
            <p className="text-zinc-500 max-w-sm">
              Software Developer since 2015. Leveraging agile frameworks to provide robust solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <button 
              onClick={() => window.location.href = 'mailto:taiwodele88@gmail.com'}
              className="px-12 py-5 bg-orange-500 text-black rounded-2xl font-black text-xl hover:bg-orange-400 transition-all shadow-2xl shadow-orange-500/40 active:scale-95"
            >
              Hire Me Now
            </button>
            <div className="flex items-center gap-6 text-zinc-500">
              <a href="#" className="hover:text-orange-500 transition-colors">Github</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Linkedin</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-zinc-600 text-xs uppercase tracking-[0.2em]">
            © 2026 Taiwo Oladele. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Hire Me Popup Banner */}
      <AnimatePresence>
        {isHireModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHireModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-dark p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-orange-500/30 shadow-2xl shadow-orange-500/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] -mr-32 -mt-32 animate-pulse-glow" />
              
              <button 
                onClick={() => setIsHireModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all z-20"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl shadow-orange-500/40 shimmer rotate-3">
                  <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-black" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">Let's Build Something <span className="text-orange-500">Amazing</span></h2>
                <p className="text-zinc-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                  I'm currently available for new projects and full-time opportunities. Let's discuss how I can help your team succeed.
                </p>

                <div className="flex flex-col gap-3 md:gap-4">
                  <button 
                    onClick={() => window.location.href = 'mailto:taiwodele88@gmail.com'}
                    className="w-full py-4 md:py-5 bg-orange-500 text-black rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-orange-400 transition-all shadow-xl shadow-orange-500/30 shimmer"
                  >
                    Send an Email
                  </button>
                  <button 
                    onClick={() => window.location.href = 'tel:09054755699'}
                    className="w-full py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-all"
                  >
                    Call Me: 09054755699
                  </button>
                </div>

                <p className="mt-6 md:mt-8 text-zinc-500 text-xs md:text-sm">
                  Typically responds within 24 hours
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
