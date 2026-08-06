'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  House,
  Download,
  ExternalLink,
  GitBranch,
  Globe2,
  Mail,
  Menu,
  MousePointer2,
  Palette,
  Shapes,
  Moon,
  Sun,
  UserRound,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'About', href: '#profile' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#stack' },
]

const roles = [
  {
    period: 'Feb 2026 — Present',
    company: 'LSP Informatics Program, SMAK 1 BPK Penabur',
    role: 'Informatics Instructor & Teaching Assistant',
    location: 'Bandung · Indonesia',
    summary: 'Entrusted to substitute for the primary university lecturer, managing the classroom and delivering technical curriculum to high school students.',
    wins: ['Taught HTML, CSS, and JavaScript', 'Introduced Scratch and Python', 'Made technical workflows accessible'],
  },
  {
    period: 'Sep 2025 — Apr 2026',
    company: 'Bandung TalentSource',
    role: 'Freelance AI Researcher & Developer',
    location: 'Bandung · Indonesia',
    summary: 'Contributed to the “Overhauling TalentSource Web using GenAI” initiative by researching and implementing Generative AI, LLM, and RPA technologies for a user-facing prototype.',
    wins: ['Explored AI tools and integrations', 'Designed LLM testing frameworks', 'Bridged technical, design, and content requirements'],
  },
  {
    period: 'Sep 2025 — Feb 2026',
    company: 'Parahyangan Catholic University',
    role: 'Teaching Assistant — Web-Based Programming',
    location: 'Bandung · Indonesia',
    summary: 'Mentored a practicum class of 35 students, simplifying programming logic and web development concepts while supporting lecturers with assessment and documentation.',
    wins: ['Mentored 35 students', 'Conducted weekly code reviews', 'Provided customized troubleshooting support'],
  },
]

const stack = [
  { label: 'TensorFlow', short: 'TF', type: 'letters' },
  { label: 'Scikit-learn', short: 'SK', type: 'letters' },
  { label: 'Python', short: 'PY', type: 'letters' },
  { label: 'Generative AI', short: 'AI', type: 'letters' },
  { label: 'AI Agents', short: 'AG', type: 'letters' },
  { label: 'AI Workflows', short: 'AW', type: 'letters' },
  { label: 'Streamlit', short: 'S', type: 'letters' },
  { label: 'Machine Learning', short: 'ML', type: 'letters' },
  { label: 'Deep Learning', short: 'DL', type: 'letters' },
  { label: 'Java Spring Boot', short: 'J', type: 'letters' },
  { label: 'Java', short: 'J', type: 'letters' },
  { label: 'SQL / PostgreSQL / MongoDB', short: 'DB', type: 'letters' },
  { label: 'Github', short: 'GT', type: 'letters' },
  { label: 'HTML', short: 'HTML', type: 'letters' },
  { label: 'CSS', short: 'CSS', type: 'letters' },
  { label: 'JavaScript', short: 'JS', type: 'letters' },
]

const projects = [
  {
    title: 'Makespan Prediction',
    type: 'Academic research',
    year: '2025 — 2026',
    description: 'An LSTM model and Streamlit application for predicting makespan and supporting flow shop scheduling analysis.',
    tags: ['LSTM', 'TensorFlow', 'Scikit-learn', 'Streamlit'],
    tone: 'project-primary',
  },
  {
    title: 'Diabetes Prediction',
    type: 'Capstone project',
    year: '2025',
    description: 'An end-to-end machine learning pipeline that predicts diabetes risk from medical data using a cleaned and evaluated TensorFlow model.',
    tags: ['TensorFlow', 'Python', 'Data Analysis'],
    tone: 'project-blue',
  },
]

const education = {
  university: 'Parahyangan Catholic University (Universitas Katolik Parahyangan)',
  degree: "Bachelor's Degree in Informatics Engineering",
  dates: 'Graduated 2026',
}

const certifications = [
  {
    name: 'Coding Camp 2025 by DBS Foundation',
    detail: 'Graduate · Machine Learning Engineer Specialization · 2025',
    description: 'Completed an intensive six-month program covering Python, TensorFlow, data analysis, deep learning, and the full machine learning lifecycle through deployment.',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="size-2 rounded-full bg-primary" />
      {children}
    </div>
  )
}

function TypedLine() {
  const words = ['predictive models', 'deep learning systems', 'Generative AI solutions', 'production-ready APIs']
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    const delay = deleting ? 45 : 90
    const timer = window.setTimeout(() => {
      if (!deleting && visible === word) {
        setDeleting(true)
      } else if (deleting && visible === '') {
        setDeleting(false)
        setWordIndex((index) => (index + 1) % words.length)
      } else {
        setVisible(deleting ? word.slice(0, visible.length - 1) : word.slice(0, visible.length + 1))
      }
    }, visible === word && !deleting ? 1600 : delay)
    return () => window.clearTimeout(timer)
  }, [deleting, visible, wordIndex])

  return (
    <span className="text-primary">
      {visible}
      <span className="ml-1 inline-block h-[0.9em] w-px translate-y-1 bg-primary motion-safe:animate-pulse" aria-hidden="true" />
    </span>
  )
}

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function ScrollAtmosphere() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  return <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" style={reduceMotion ? undefined : { y }}><div className="absolute -left-32 top-[10%] size-96 rounded-full bg-primary/8 blur-[120px]" /><div className="absolute right-[-8rem] top-[48%] size-96 rounded-full bg-primary/5 blur-[130px]" /></motion.div>
}

function HeroGeometry() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [12, -12]), { stiffness: 100, damping: 18 })
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-16, 16]), { stiffness: 100, damping: 18 })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width * 2 - 1)
    pointerY.set((event.clientY - rect.top) / rect.height * 2 - 1)
  }

  return <motion.div ref={ref} onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }} className="absolute right-[8%] top-32 hidden size-64 [perspective:900px] lg:block" style={reduceMotion ? undefined : { rotateX, rotateY }}><motion.div className="relative size-full [transform-style:preserve-3d]" animate={reduceMotion ? undefined : { rotateZ: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}><div className="absolute inset-12 rounded-3xl border border-primary/60 bg-primary/10 shadow-[0_0_80px_color-mix(in_oklch,var(--primary)_25%,transparent)] [transform:translateZ(50px)]" /><div className="absolute inset-12 rounded-3xl border border-primary/30 [transform:rotateY(90deg) translateZ(50px)]" /><div className="absolute inset-12 rounded-3xl border border-primary/30 [transform:rotateX(90deg) translateZ(50px)]" /><div className="absolute inset-0 rounded-full border border-primary/20" /></motion.div></motion.div>
}

function MotionArticle({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 22 })

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nextX = (event.clientX - rect.left) / rect.width * 100
    const nextY = (event.clientY - rect.top) / rect.height * 100
    ref.current.style.setProperty('--pointer-x', `${nextX}%`)
    ref.current.style.setProperty('--pointer-y', `${nextY}%`)
    rotateX.set((nextY - 50) / -10)
    rotateY.set((nextX - 50) / 10)
  }

  function resetTilt() {
    if (!ref.current) return
    ref.current.style.setProperty('--pointer-x', '50%')
    ref.current.style.setProperty('--pointer-y', '50%')
    rotateX.set(0); rotateY.set(0)
  }

  return <motion.article ref={ref} onPointerMove={handlePointerMove} onPointerLeave={resetTilt} style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }} className={className} whileHover={reduceMotion ? undefined : { scale: 1.015 }}>{children}<div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), color-mix(in oklch, var(--primary) 18%, transparent), transparent 32%)' }} /></motion.article>
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 22 })
  const x = useMotionValue(50)
  const y = useMotionValue(50)

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nextX = (event.clientX - rect.left) / rect.width * 100
    const nextY = (event.clientY - rect.top) / rect.height * 100
    x.set(nextX)
    y.set(nextY)
    ref.current.style.setProperty('--pointer-x', `${nextX}%`)
    ref.current.style.setProperty('--pointer-y', `${nextY}%`)
    rotateX.set((nextY - 50) / -10)
    rotateY.set((nextX - 50) / 10)
  }

  function resetTilt() {
    x.set(50); y.set(50); ref.current?.style.setProperty('--pointer-x', '50%'); ref.current?.style.setProperty('--pointer-y', '50%'); rotateX.set(0); rotateY.set(0)
  }

  return <motion.article ref={ref} onPointerMove={handlePointerMove} onPointerLeave={resetTilt} style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }} className="group flex min-h-[430px] flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow] duration-500 hover:border-primary/50" whileHover={reduceMotion ? undefined : { scale: 1.015 }}><div className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), color-mix(in oklch, var(--primary) 18%, transparent), transparent 32%)' }} /><div className={`relative min-h-56 flex-1 overflow-hidden p-6 ${project.tone}`}><div className="absolute inset-0 opacity-40" /><div className="relative flex items-start justify-between text-xs font-medium uppercase tracking-[0.15em] text-background/70"><span>{project.type}</span><span>{project.year}</span></div><div className="absolute bottom-8 left-6 right-6"><div className="flex items-end justify-between"><div className="text-5xl font-semibold tracking-[-0.08em] text-background transition-transform duration-500 group-hover:translate-x-2">{project.title.split(' ')[0]}<br />{project.title.split(' ')[1]}</div><span className="flex size-12 items-center justify-center rounded-full bg-background/15 text-background backdrop-blur-sm transition-transform group-hover:rotate-45"><ArrowUpRight size={20} /></span></div></div></div><div className="relative z-20 flex flex-col gap-6 p-6"><p className="text-sm leading-6 text-muted-foreground">{project.description}</p><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">{tag}</span>)}</div><div className="flex items-center justify-between border-t border-border pt-5 text-sm font-medium"><a href="#connect" className="flex items-center gap-2 transition-colors hover:text-primary">Discuss project <ArrowUpRight size={15} /></a><span className="text-muted-foreground">Selected work</span></div></div></motion.article>
}

function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    const nextDark = savedTheme ? savedTheme === 'dark' : true
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light'
  }, [])

  function toggleTheme() {
    const nextDark = !dark
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light'
    window.localStorage.setItem('portfolio-theme', nextDark ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary/70 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export function PortfolioPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeRole, setActiveRole] = useState(0)
  const role = roles[activeRole]

  return (
    <main className="flex flex-col overflow-hidden">
      <ScrollAtmosphere />
      <header className="order-0 fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/70 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-5" aria-label="Primary navigation">
          <a href="#top" className="group flex items-center gap-2 text-sm font-semibold tracking-tight" onClick={() => setMobileOpen(false)}>
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-background"><House size={20} /></span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{item.label}</a>)}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#connect" className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 md:flex">
              Let&apos;s talk <ArrowUpRight size={14} />
            </a>
          </div>
          <button type="button" className="flex size-9 items-center justify-center rounded-full bg-secondary md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          {mobileOpen && <div className="absolute left-0 right-0 top-14 flex flex-col gap-1 rounded-3xl border border-border bg-card p-3 shadow-2xl md:hidden">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">{item.label}</a>)}<a href="#connect" onClick={() => setMobileOpen(false)} className="mt-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-background">Start a conversation</a></div>}
        </nav>
      </header>

      <motion.section id="top" className="order-1 relative flex min-h-[760px] items-end px-6 pb-20 pt-40 sm:px-10 lg:min-h-screen lg:px-16 lg:pb-24" initial="hidden" animate="visible" variants={revealVariants}>
        <div className="portfolio-grid absolute inset-0 -z-10 opacity-70" />
        <HeroGeometry />
        <div className="absolute right-[-10%] top-20 -z-10 size-[480px] rounded-full bg-primary/10 blur-[110px]" />
        <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-primary" /></span> Available for selected projects · 2026</div>
            <h1 className="max-w-5xl text-balance text-[clamp(3.5rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">Building <span className="text-muted-foreground">intelligent</span><br /><span className="text-primary">systems.</span></h1>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-pretty text-lg leading-7 text-muted-foreground">Hi, I&apos;m Zefandion Benaya Teja — an AI Engineer and recent Informatics Engineering graduate building predictive, generative, and production-ready systems.</p>
              <a href="#projects" className="group flex w-fit items-center gap-3 text-sm font-semibold">Explore my work <span className="flex size-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-background"><ArrowDownRight size={16} /></span></a>
            </div>
          </div>
          <div className="lg:pb-3 lg:pl-10">
            <div className="mb-8 flex items-center gap-6">
              <Avatar className="w-32 h-32 sm:w-48 sm:h-48 border-2 border-primary/50 bg-secondary p-1 shadow-[0_0_0_8px_color-mix(in_oklch,var(--primary)_10%,transparent)] rounded-full relative overflow-hidden">
                
                {/* 2. Paksa gambar untuk memenuhi area dengan w-full h-full object-cover */}
                <AvatarImage 
                  src="/Foto.jpeg" 
                  alt="Zefandion Benaya Teja profile photo" 
                  className="w-full h-full object-cover rounded-full"
                />
                
              </Avatar>
              <div>
                <p className="text-lg font-medium">Zefandion Benaya Teja</p>
                <p className="mt-1 text-sm text-muted-foreground">Artificial Intelligence Engineer</p>
              </div>
            </div>
            <div className="border-l border-border pl-5 text-2xl leading-tight tracking-tight sm:text-3xl">I build <TypedLine /></div>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"><Globe2 size={15} className="text-primary" /> Working from Bandung, Indonesia</div>
          </div>
        </div>
      </motion.section>

      <motion.section id="profile" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants} className="order-2 border-t border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div><SectionLabel>01 / Professional profile</SectionLabel><p className="max-w-xs text-sm leading-6 text-muted-foreground">An innovative Artificial Intelligence Engineer from Bandung, Indonesia, focused on predictive modeling, deep learning, and Generative AI.</p></div>
          <div><h2 className="max-w-4xl text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">I translate complex data into <span className="text-muted-foreground">scalable, production-ready AI systems.</span></h2><div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3"><div><p className="text-4xl font-semibold tracking-tight text-primary">AI</p><p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">Generative & predictive</p></div><div><p className="text-4xl font-semibold tracking-tight">Tensorflow</p><p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">deep learning focus</p></div><div><p className="text-4xl font-semibold tracking-tight">Automation</p><p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">AI Agents & AI Workflow</p></div></div></div>
        </div>
      </motion.section>

      <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants} className="order-4 border-t border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl"><SectionLabel>03 / Experience</SectionLabel><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div className="flex flex-col">{roles.map((item, index) => <button type="button" key={item.company} onClick={() => setActiveRole(index)} className={`group flex items-start justify-between border-t border-border py-5 text-left transition-colors ${activeRole === index ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><span><span className={`mb-2 block text-xs ${activeRole === index ? 'text-primary' : ''}`}>{item.period}</span><span className="text-lg font-medium tracking-tight">{item.company}</span></span><ArrowUpRight size={17} className={`transition-transform ${activeRole === index ? 'translate-x-1 -translate-y-1 text-primary' : 'opacity-0 group-hover:opacity-100'}`} /></button>)}</div><div className="rounded-3xl border border-border bg-card p-7 sm:p-10"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="mb-2 text-sm text-primary">{role.period}</p><h3 className="text-3xl font-medium tracking-tight">{role.role}</h3><p className="mt-2 text-sm text-muted-foreground">{role.company} · {role.location}</p></div><BriefcaseBusiness className="text-muted-foreground" size={22} /></div><p className="mt-12 max-w-2xl text-lg leading-7 text-muted-foreground">{role.summary}</p><ul className="mt-10 grid gap-4 border-t border-border pt-7 sm:grid-cols-3">{role.wins.map((win) => <li key={win} className="flex gap-2 text-sm leading-5"><Check size={15} className="mt-0.5 shrink-0 text-primary" />{win}</li>)}</ul></div></div></div>
      </motion.section>

      <motion.section id="education" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants} className="order-3 border-t border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel>02 / Education</SectionLabel></div><div className="rounded-3xl border border-border bg-card p-7 sm:p-10"><p className="text-sm text-primary">{education.dates}</p><h2 className="mt-3 text-3xl font-medium tracking-tight">{education.degree}</h2><p className="mt-3 text-base text-muted-foreground">{education.university}</p></div></div></motion.section>

      <motion.section id="certifications" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants} className="order-3 border-t border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel>02 / Licenses & certifications</SectionLabel><p className="max-w-xs text-sm leading-6 text-muted-foreground">Focused training that connects machine learning fundamentals to real-world deployment.</p></div><div className="grid gap-5">{certifications.map((certificate) => <article key={certificate.name} className="rounded-3xl border border-border bg-card p-7 sm:p-10"><p className="text-sm text-primary">{certificate.detail}</p><h2 className="mt-3 text-3xl font-medium tracking-tight">{certificate.name}</h2><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{certificate.description}</p></article>)}</div></div></motion.section>

      <motion.section id="stack" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants} className="order-6 border-t border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel>06 / Skills</SectionLabel><p className="max-w-xs text-sm leading-6 text-muted-foreground">The tools I reach for when the work needs to be fast, resilient, and a pleasure to maintain.</p></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">{stack.map((item) => <div key={item.label} className="group flex min-h-32 flex-col justify-between bg-background p-5 transition-colors hover:bg-secondary"><span className={`flex size-10 items-center justify-center rounded-xl border border-border text-sm font-semibold text-primary transition-transform group-hover:scale-110 ${item.type === 'mark' ? 'text-xl' : ''}`}>{item.short}</span><span className="text-sm text-muted-foreground group-hover:text-foreground">{item.label}</span></div>)}</div></div></motion.section>

      <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants} className="order-5 border-t border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-8"><div><SectionLabel>05 / Featured projects</SectionLabel><h2 className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Selected work<span className="text-primary">.</span></h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">A small edit of collaborations where strategy, design, and engineering met in the middle.</p></div><div className="mt-14 grid gap-5 lg:grid-cols-3">{projects.map((project) => <MotionArticle key={project.title} className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"><div className={`relative min-h-56 flex-1 overflow-hidden p-6 ${project.tone}`}><div className="absolute inset-0 opacity-40" /><div className="relative flex items-start justify-between text-xs font-medium uppercase tracking-[0.15em] text-background/70"><span>{project.type}</span><span>{project.year}</span></div><div className="absolute bottom-8 left-6 right-6"><div className="flex items-end justify-between"><div className="text-5xl font-semibold tracking-[-0.08em] text-background transition-transform duration-500 group-hover:translate-x-2">{project.title.split(' ')[0]}<br />{project.title.split(' ')[1]}</div><span className="flex size-12 items-center justify-center rounded-full bg-background/15 text-background backdrop-blur-sm transition-transform group-hover:rotate-45"><ArrowUpRight size={20} /></span></div></div></div><div className="flex flex-col gap-6 p-6"><p className="text-sm leading-6 text-muted-foreground">{project.description}</p><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">{tag}</span>)}</div><div className="flex items-center gap-5 border-t border-border pt-5 text-xs font-semibold"><a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><GitBranch size={15} /> GitHub</a></div></div></MotionArticle>)}</div></div></motion.section>

      <footer id="connect" className="order-7 border-t border-border px-6 pb-8 pt-24 sm:px-10 lg:px-16 lg:pt-32"><div className="mx-auto max-w-7xl"><SectionLabel>07 / Connect</SectionLabel><div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"><div><h2 className="max-w-4xl text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-7xl">Have a good idea?<br /><span className="text-primary">Let&apos;s make it real.</span></h2><a href="mailto:zefandion03@gmail.com" className="mt-10 inline-flex items-center gap-3 text-lg font-medium underline decoration-border underline-offset-8 transition-colors hover:decoration-primary">zefandion03@gmail.com <ArrowUpRight size={18} /></a></div><div className="flex flex-col gap-3 lg:items-end"><a href="https://www.linkedin.com/in/zefandion" target="_blank" rel="noreferrer" className="flex w-fit items-center gap-3 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-primary hover:bg-primary hover:text-background"><UserRound size={16} /> LinkedIn</a><a href="mailto:zefandion03@gmail.com" className="flex w-fit items-center gap-3 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-primary hover:bg-primary hover:text-background"><Mail size={16} /> Email me</a><a href="/Resume.pdf" download className="flex w-fit items-center gap-3 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-primary hover:bg-primary hover:text-background"><Download size={16} /> Download resume</a></div></div><div className="mt-24 flex flex-col gap-5 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Zefandion Benaya Teja. Built with care.</span><span className="flex items-center gap-2"><MousePointer2 size={14} className="text-primary" /> Available worldwide · UTC−1 to UTC+3</span><span className="flex items-center gap-3"><Palette size={14} /> Design & code</span></div></div></footer>
    </main>
  )
}
