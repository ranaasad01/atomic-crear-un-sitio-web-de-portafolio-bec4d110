"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowRight, ExternalLink, Star, Code, Layers, Zap, Users, CheckCircle, ChevronDown } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_EMAIL, APP_GITHUB, APP_LINKEDIN, APP_TWITTER } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Fintrack Dashboard",
    description: "Plataforma de análisis financiero en tiempo real con visualizaciones interactivas, alertas personalizadas y exportación de reportes. Usada por más de 3,000 equipos de contabilidad.",
    tags: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    image: "https://framerusercontent.com/images/jjWu4pxMf8DRk63cOQg8uwLk8.png?scale-down-to=2048",
    github: "https://github.com/alexmoreno/fintrack",
    live: "https://fintrack.demo",
    featured: true,
    color: "from-amber-500/20 to-orange-600/10",
  },
  {
    id: 2,
    title: "Collab Studio",
    description: "Editor colaborativo en tiempo real para equipos de diseño. Soporta comentarios en hilo, versiones y exportación a Figma y Sketch.",
    tags: ["React", "WebSockets", "Node.js", "PostgreSQL"],
    image: "https://media.licdn.com/dms/image/v2/C560BAQF0-E39YIJeIQ/company-logo_200_200/company-logo_200_200/0/1678746793423?e=2147483647&v=beta&t=zP2RdA9O68vN4ClPFA4OsHwwNrEhsohjFi8JHFEDeNM",
    github: "https://github.com/alexmoreno/collab-studio",
    live: "https://collabstudio.demo",
    featured: true,
    color: "from-sky-500/20 to-blue-600/10",
  },
  {
    id: 3,
    title: "Pulse CMS",
    description: "Sistema de gestión de contenido headless con API GraphQL, soporte multilenguaje y panel de administración personalizable.",
    tags: ["GraphQL", "Prisma", "Next.js", "Tailwind"],
    image: "https://pulsecms.com/assets/assets/branding/pulse-circle@2x.png",
    github: "https://github.com/alexmoreno/pulse-cms",
    live: "https://pulsecms.demo",
    featured: false,
    color: "from-violet-500/20 to-purple-600/10",
  },
  {
    id: 4,
    title: "ShipFast CLI",
    description: "Herramienta de línea de comandos para scaffolding de proyectos Next.js con configuración de ESLint, Prettier, Husky y CI/CD lista para producción.",
    tags: ["Node.js", "Commander.js", "Inquirer", "Shell"],
    image: "https://shipfa.st/_next/static/media/stripe_helper.3c27ba9d.png",
    github: "https://github.com/alexmoreno/shipfast-cli",
    live: "https://shipfast.demo",
    featured: false,
    color: "from-emerald-500/20 to-green-600/10",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"] },
  { category: "Backend", items: ["Node.js", "Express", "GraphQL", "REST APIs", "Prisma", "PostgreSQL"] },
  { category: "DevOps", items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Nginx", "Linux"] },
  { category: "Herramientas", items: ["Git", "Figma", "Storybook", "Jest", "Playwright", "Postman"] },
];

const experience = [
  {
    id: 1,
    role: "Senior Full Stack Engineer",
    company: "Vercel",
    period: "2022 — Presente",
    description: "Lideré el desarrollo de nuevas funcionalidades del dashboard de analíticas, mejorando el tiempo de carga en un 40%. Colaboré con el equipo de diseño para rediseñar el flujo de onboarding.",
    tags: ["Next.js", "TypeScript", "Go", "PostgreSQL"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Stripe",
    period: "2020 — 2022",
    description: "Desarrollé integraciones de pago para más de 15 mercados internacionales. Construí el sistema de webhooks que procesa más de 2M de eventos diarios con 99.99% de uptime.",
    tags: ["React", "Node.js", "Redis", "Kafka"],
  },
  {
    id: 3,
    role: "Frontend Engineer",
    company: "Notion",
    period: "2018 — 2020",
    description: "Implementé el editor de bloques colaborativo y el sistema de permisos granulares. Reduje el bundle size en un 35% mediante code splitting y lazy loading estratégico.",
    tags: ["React", "TypeScript", "WebSockets", "IndexedDB"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sara Jiménez",
    role: "CTO en Factorial",
    avatar: "https://m.media-amazon.com/images/M/MV5BZDM5NDVjMWQtMmQyNy00YjMyLTg3ODAtMmY1OTA1MTEyNGE4XkEyXkFqcGc@._V1_.jpg",
    text: "Alex tiene una capacidad única para traducir requisitos complejos en soluciones elegantes. Su código es limpio, bien documentado y siempre pensado para escalar.",
  },
  {
    id: 2,
    name: "Carlos Rueda",
    role: "Product Manager en Cabify",
    avatar: "https://www.marshallhealth.org/img/providers/rueda.jpg",
    text: "Trabajar con Alex fue una experiencia excepcional. Entregó el proyecto dos semanas antes del plazo y con una calidad que superó todas nuestras expectativas.",
  },
  {
    id: 3,
    name: "Marta Vidal",
    role: "Founder en Landbot",
    avatar: "https://win-advisor-media-library.s3.us-west-1.amazonaws.com/wp-content/uploads/2026/06/17130924/Marta-Vidal-new-president-CAVA-D.O-768x512.jpeg",
    text: "Desde el primer día, Alex demostró un dominio técnico impresionante y una comunicación impecable. Lo recomendaría sin dudarlo para cualquier proyecto ambicioso.",
  },
];

const stats = [
  { value: "6+", label: "Años de experiencia" },
  { value: "40+", label: "Proyectos entregados" },
  { value: "15+", label: "Clientes satisfechos" },
  { value: "99%", label: "Tasa de retención" },
];

// ─── Reusable animated section wrapper ──────────────────────────────────────

function SectionWrapper({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      variants={shouldReduce ? undefined : fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Tag pill ────────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700/60">
      {label}
    </span>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<string>("Frontend");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  const activeSkillData = skills.find((s) => s.category === activeSkill);

  return (
    <main className="bg-zinc-950 text-zinc-100 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/4 rounded-full blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={shouldReduce ? undefined : fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-amber-400/10 text-amber-400 rounded-full border border-amber-400/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Disponible para proyectos
              </span>
              <h1 className="font-space text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.05] text-balance">
                Hola, soy{" "}
                <span className="text-amber-400">{APP_NAME}</span>
              </h1>
            </motion.div>

            <motion.p
              variants={shouldReduce ? undefined : fadeInUp}
              className="text-xl text-zinc-400 leading-relaxed max-w-lg text-pretty"
            >
              {APP_TAGLINE} especializado en construir productos digitales rápidos, accesibles y con una experiencia de usuario que deja huella.
            </motion.p>

            <motion.div
              variants={shouldReduce ? undefined : fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-zinc-950 font-semibold rounded-xl hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.45)] hover:-translate-y-0.5"
              >
                Ver proyectos
                <ArrowRight size={16} />
              </a>
              <a
                href={`mailto:${APP_EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-200 font-semibold rounded-xl border border-zinc-700/60 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={16} />
                Contactar
              </a>
            </motion.div>

            <motion.div
              variants={shouldReduce ? undefined : fadeInUp}
              className="flex items-center gap-5 pt-2"
            >
              <a href={APP_GITHUB} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-amber-400 transition-colors duration-200" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={APP_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-amber-400 transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={APP_TWITTER} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-amber-400 transition-colors duration-200" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <span className="w-px h-5 bg-zinc-700" />
              <span className="text-sm text-zinc-500">{APP_EMAIL}</span>
            </motion.div>
          </motion.div>

          {/* Right: avatar + stats */}
          <motion.div
            variants={shouldReduce ? undefined : slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-end gap-8"
          >
            {/* Avatar card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400/30 to-orange-500/10 blur-sm" />
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHCZzVdQfPbgQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1666300198615?e=2147483647&v=beta&t=rilq_2YLZfSt0xG0OuP36iGt507DU3_2cDe2t07I0pI"
                  alt="Alex Moreno, desarrollador Full Stack"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-zinc-700/50">
                    <Code size={14} className="text-amber-400 shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">6+ años construyendo en la web</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 w-72">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-3 text-center shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_16px_-4px_rgba(0,0,0,0.3)]"
                >
                  <div className="text-2xl font-bold font-space text-amber-400">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ── SOBRE MÍ ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="sobre-mi" className="py-24 md:py-32 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={shouldReduce ? undefined : slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/10 to-transparent blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800/60 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <img
                  src="https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/08EE/production/_128268220_gettyimages-1455770919.jpg"
                  alt="Alex Moreno trabajando en su setup"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-700/60 rounded-2xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                    <Zap size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">Entrega rápida</div>
                    <div className="text-xs text-zinc-500">Sin sacrificar calidad</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={shouldReduce ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.div variants={shouldReduce ? undefined : fadeInUp}>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Sobre mí</span>
                <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mt-3 text-balance">
                  Código que escala, diseño que enamora
                </h2>
              </motion.div>

              <motion.p variants={shouldReduce ? undefined : fadeInUp} className="text-zinc-400 leading-relaxed text-pretty">
                Soy un desarrollador Full Stack con más de 6 años construyendo productos digitales para startups y empresas de alto crecimiento. Me apasiona la intersección entre ingeniería de software y diseño de experiencias.
              </motion.p>

              <motion.p variants={shouldReduce ? undefined : fadeInUp} className="text-zinc-400 leading-relaxed text-pretty">
                He trabajado con equipos distribuidos en tres continentes, liderado migraciones de arquitectura críticas y mentorizado a desarrolladores junior. Creo que el mejor código es el que no necesita explicación.
              </motion.p>

              <motion.ul variants={shouldReduce ? undefined : staggerContainer} className="space-y-3 pt-2">
                {[
                  "Arquitectura de aplicaciones Next.js a escala",
                  "APIs REST y GraphQL de alto rendimiento",
                  "Sistemas de diseño y componentes reutilizables",
                  "Optimización de Core Web Vitals y accesibilidad",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={shouldReduce ? undefined : fadeInUp}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <CheckCircle size={16} className="text-amber-400 mt-0.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── PROYECTOS ────────────────────────────────────────────────────── */}
      <SectionWrapper id="proyectos" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            variants={shouldReduce ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center space-y-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Proyectos</span>
            <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 text-balance">
              Trabajo que habla por sí solo
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-pretty">
              Una selección de proyectos que demuestran mi enfoque en rendimiento, escalabilidad y experiencia de usuario.
            </p>
          </motion.div>

          {/* Featured projects — asymmetric layout */}
          <div className="space-y-8">
            {projects.filter((p) => p.featured).map((project, i) => (
              <motion.article
                key={project.id}
                variants={shouldReduce ? undefined : (i % 2 === 0 ? slideInLeft : slideInRight)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900/40 shadow-[0_2px_8px_rgba(0,0,0,0.2),0_16px_48px_-12px_rgba(0,0,0,0.4)] ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Image */}
                <div className={`relative h-64 lg:h-auto overflow-hidden ${i % 2 === 1 ? "[direction:ltr]" : ""}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${i % 2 === 0 ? "from-transparent to-zinc-900/80" : "from-zinc-900/80 to-transparent"}`} />
                </div>

                {/* Content */}
                <div className={`relative p-8 lg:p-10 flex flex-col justify-center space-y-5 ${i % 2 === 1 ? "[direction:ltr]" : ""}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
                  <div className="relative space-y-5">
                    <div className="flex items-center gap-2">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Destacado</span>
                    </div>
                    <h3 className="font-space text-2xl font-bold text-zinc-100">{project.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm text-pretty">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-200"
                      >
                        <Github size={15} />
                        Código
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-200"
                      >
                        <ExternalLink size={15} />
                        Demo en vivo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Other projects — grid */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.filter((p) => !p.featured).map((project) => (
              <motion.article
                key={project.id}
                variants={shouldReduce ? undefined : scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900/40 shadow-[0_2px_8px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-zinc-700/80 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                </div>
                <div className="relative p-6 space-y-3">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
                  <div className="relative space-y-3">
                    <h3 className="font-space text-lg font-bold text-zinc-100">{project.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed text-pretty">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-400 transition-colors">
                        <Github size={13} /> Código
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-400 transition-colors">
                        <ExternalLink size={13} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── EXPERIENCIA ──────────────────────────────────────────────────── */}
      <SectionWrapper id="experiencia" className="py-24 md:py-32 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            {/* Sticky label */}
            <motion.div
              variants={shouldReduce ? undefined : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:sticky lg:top-28 self-start space-y-4"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Experiencia</span>
              <h2 className="font-space text-4xl font-bold tracking-tight text-zinc-100 text-balance">
                Empresas donde he dejado huella
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed text-pretty">
                He tenido el privilegio de trabajar con algunas de las empresas de tecnología más innovadoras del mundo.
              </p>
            </motion.div>

            {/* Timeline */}
            <motion.div
              variants={shouldReduce ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative space-y-0"
            >
              {/* Vertical line */}
              <div className="absolute left-5 top-2 bottom-2 w-px bg-zinc-800" />

              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={shouldReduce ? undefined : fadeInUp}
                  className="relative pl-14 pb-12 last:pb-0"
                >
                  {/* Dot */}
                  <div className={`absolute left-3 top-1.5 w-4 h-4 rounded-full border-2 ${i === 0 ? "bg-amber-400 border-amber-400" : "bg-zinc-950 border-zinc-600"} shadow-[0_0_0_4px_rgba(9,9,11,1)]`} />

                  <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.3)] hover:border-zinc-700/80 transition-colors duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-space text-lg font-bold text-zinc-100">{exp.role}</h3>
                        <span className="text-amber-400 font-semibold text-sm">{exp.company}</span>
                      </div>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700/60 shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed text-pretty">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── HABILIDADES ──────────────────────────────────────────────────── */}
      <SectionWrapper id="habilidades" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            variants={shouldReduce ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center space-y-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Habilidades</span>
            <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 text-balance">
              Mi stack tecnológico
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-pretty">
              Herramientas y tecnologías que uso a diario para construir productos robustos y escalables.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
            {/* Category tabs */}
            <motion.div
              variants={shouldReduce ? undefined : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex lg:flex-col gap-2"
            >
              {skills.map((s) => (
                <button
                  key={s.category}
                  onClick={() => setActiveSkill(s.category)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-200 whitespace-nowrap ${
                    activeSkill === s.category
                      ? "bg-amber-400 text-zinc-950 shadow-[0_0_16px_rgba(251,191,36,0.3)]"
                      : "bg-zinc-900/60 text-zinc-400 border border-zinc-800/60 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {s.category}
                </button>
              ))}
            </motion.div>

            {/* Skills grid */}
            <motion.div
              key={activeSkill}
              variants={shouldReduce ? undefined : staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {(activeSkillData?.items ?? []).map((item) => (
                <motion.div
                  key={item}
                  variants={shouldReduce ? undefined : scaleIn}
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.25)] hover:border-amber-400/30 hover:bg-zinc-800/60 transition-all duration-200 cursor-default"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Value props row */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-800/60"
          >
            {[
              { icon: Code, title: "Código limpio", desc: "Escribo código que otros desarrolladores disfrutan leer y mantener. Documentación, tests y revisiones de código son parte de mi flujo." },
              { icon: Layers, title: "Arquitectura sólida", desc: "Diseño sistemas que escalan. Desde monolitos bien estructurados hasta microservicios, elijo la arquitectura correcta para cada problema." },
              { icon: Users, title: "Trabajo en equipo", desc: "He liderado equipos de hasta 8 personas. Creo en la comunicación asíncrona, la documentación y los procesos que empoderan a todos." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={shouldReduce ? undefined : fadeInUp}
                className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                  <Icon size={18} className="text-amber-400" />
                </div>
                <h3 className="font-space text-base font-bold text-zinc-100">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed text-pretty">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <SectionWrapper className="py-24 md:py-32 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            variants={shouldReduce ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center space-y-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Testimonios</span>
            <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 text-balance">
              Lo que dicen quienes han trabajado conmigo
            </h2>
          </motion.div>

          <motion.div
            variants={shouldReduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.id}
                variants={shouldReduce ? undefined : fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`relative bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-zinc-700/80 transition-all duration-300 ${i === 1 ? "md:mt-8" : ""}`}
              >
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} size={13} className="text-amber-400 fill-amber-400" />Alex has a unique ability to translate complex requirements into elegant solutions.</div>
                <p className="text-zinc-300 text-sm leading-relaxed text-pretty">{t.text}</p>
                <footer className="flex items-center gap-3 pt-2 border-t border-zinc-800/60">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700/60"
                  />
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── CONTACTO ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="contacto" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: copy */}
            <motion.div
              variants={shouldReduce ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <motion.div variants={shouldReduce ? undefined : fadeInUp} className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Contacto</span>
                <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 text-balance">
                  Construyamos algo increíble juntos
                </h2>
                <p className="text-zinc-400 leading-relaxed text-pretty">
                  Estoy abierto a proyectos freelance, posiciones full-time y colaboraciones interesantes. Si tienes una idea, cuéntamela.
                </p>
              </motion.div>

              <motion.div variants={shouldReduce ? undefined : fadeInUp} className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: APP_EMAIL, href: `mailto:${APP_EMAIL}` },
                  { icon: Github, label: "GitHub", value: "github.com/alexmoreno", href: APP_GITHUB },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexmoreno", href: APP_LINKEDIN },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-4 p-4 bg-zinc-900/60 border border-zinc-800/60 rounded-xl hover:border-amber-400/30 hover:bg-zinc-800/60 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/20 transition-colors">
                      <Icon size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{label}</div>
                      <div className="text-sm text-zinc-200 font-medium">{value}</div>
                    </div>
                    <ArrowRight size={14} className="text-zinc-600 ml-auto group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={shouldReduce ? undefined : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              ref={contactRef}
            >
              {formSent ? (
                <div className="bg-zinc-900/60 border border-amber-400/30 rounded-2xl p-10 text-center space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto">
                    <CheckCircle size={28} className="text-amber-400" />
                  </div>
                  <h3 className="font-space text-xl font-bold text-zinc-100">Mensaje enviado</h3>
                  <p className="text-zinc-400 text-sm">Gracias por escribirme. Te responderé en menos de 24 horas.</p>
                  <button
                    onClick={() => { setFormSent(false); setFormState({ name: "", email: "", message: "" }); }}
                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-8 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="Tu nombre completo"
                      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="tu@email.com"
                      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleFormChange}
                      placeholder="Cuéntame sobre tu proyecto o idea..."
                      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 text-zinc-950 font-semibold rounded-xl hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.4)]"
                  >
                    Enviar mensaje
                    <ArrowRight size={16} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}