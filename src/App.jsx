import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import laptopImage from './assets/laptop-background1.jpg'
import profileImage from './assets/profile-photo.jpeg'
import lightModeIcon from './assets/icons/light-mode.png'
import darkModeIcon from './assets/icons/dark-mode.png'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

const skills = [
  {
    title: 'Programming Languages',
    topics: ['C++', 'Python', 'SQL'],
  },
  {
    title: 'Python & ML Libraries',
    topics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-Learn'],
  },
  {
    title: 'Developer Tools',
    topics: ['VS Code', 'Google Colab', 'Jupyter Notebook'],
  },
  {
    title: 'Gen AI Frameworks',
    topics: ['LangChain'],
  },
]

const projects = [
  {
    name: 'Vision Attend',
    description:
      'Robust classroom attendance pipeline powered by Siamese neural networks, OpenCV capture, MTCNN detection, and FastAPI inference behind a responsive React and Express dashboard.',
    demo: 'https://drive.google.com/file/d/1qpr7F8-5z8XtttxdQiyzODMN5TN0fmkq/view?usp=sharing',
    github: 'https://github.com/yugjain/vision-attend',
    // timeline: 'Feb 2025 – Apr 2025',
    stack: ['TensorFlow', 'OpenCV', 'FastAPI', 'React.JS', 'Express.JS', 'PostgreSQL'],
  },
  {
    name: 'PersonaPredictor',
    description:
      'Predictive personality classifier that fuses XGBoost, LightGBM, CatBoost, and Optuna-driven tuning into a stacking ensemble for accurate introvert vs extrovert insights.',
    demo: 'https://persona-predict-frontend-rphi.vercel.app/',
    github: 'https://github.com/yugjain/persona-predictor',
    // timeline: 'Jul 2025',
    stack: ['Scikit-Learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Optuna'],
  },
]

const achievements = [
  {
    title: 'Achievements',
    bullets: ['Secured 1st position in Engineering Mathematics III within the department.'],
  },
  {
    title: 'Volunteering',
    bullets: ['Marketing Team – Pulzion 2024: Raised sponsorships that enabled successful event execution.'],
  },
]

const contactDetails = {
  email: 'yugnitin2468@gmail.com',
  phone: '+91 9322966654',
  linkedin: 'https://www.linkedin.com/in/yug-jain-851354284/',
  github: 'https://github.com/YNJ27',
}

const photoUrl =
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80'

const fadeIn = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

// Load any icon files placed in `src/assets/icons/` (svg/png/jpg/jpeg)
// Vite's `import.meta.glob` returns a map of path -> module with default URL export.
const iconModules = import.meta.glob('./assets/icons/*.{svg,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' })
const iconsMap = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => [path.split('/').pop().toLowerCase(), url]),
)

function getIconUrl(topic) {
  const original = String(topic).toLowerCase().trim()

  // Common aliases for tricky names
  const aliases = {
    'c++': ['cpp', 'c-plus-plus', 'c'],
    'c#': ['c-sharp', 'csharp', 'c'],
    'vs code': ['vs-code', 'vscode'],
    'scikit-learn': ['scikit-learn', 'scikitlearn', 'sklearn'],
  }

  const candidates = []
  if (aliases[original]) candidates.push(...aliases[original])

  // normalized base (compress multiple non-alnum into single hyphen, trim)
  const base = original.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').replace(/-+/g, '-')
  if (base) candidates.push(base)

  // Try replacing plus signs with 'plus' (e.g. C++ -> c-plus)
  const plusReplaced = original.replace(/\+/g, 'plus').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (plusReplaced) candidates.push(plusReplaced)

  const exts = ['svg', 'png', 'jpg', 'jpeg']
  for (const cand of candidates) {
    for (const ext of exts) {
      const key = `${cand}.${ext}`
      if (iconsMap[key]) return iconsMap[key]
    }
  }

  return null
}

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const themeStyles = useMemo(
    () => ({
      surface: isDark ? 'bg-slate-900/60' : 'bg-white/70',
      textMuted: isDark ? 'text-slate-300' : 'text-slate-600',
      border: isDark ? 'border-white/10' : 'border-slate-200',
    }),
    [isDark],
  )

  return (
    <div className={`${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <header className="sticky top-0 z-50 border-b border-white/20 bg-slate-50/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
            <a href="#home" className="text-lg font-semibold tracking-tight">
              Yug Jain
            </a>
            <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-slate-500 transition hover:text-brand-light dark:text-slate-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-700 transition hover:border-brand-light hover:text-brand-light dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
              aria-label="Toggle theme"
            >
              <img
                src={isDark ? darkModeIcon : lightModeIcon}
                alt="Toggle theme"
                className={`h-5 w-5 ${isDark ? 'invert' : ''}`}
              />
            </button>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-16 sm:px-8 sm:py-24">
          <motion.section
            id="home"
            className="flex min-h-screen flex-col items-center justify-center text-center rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${laptopImage})`,
            }}
            {...fadeIn}
          >
            <div className="rounded-3xl bg-black/40 backdrop-blur-sm px-8 py-8 max-w-2xl">
              <h1 className="text-5xl font-semibold uppercase tracking-[0.2em] sm:text-6xl md:text-7xl text-white">
                Yug Jain
              </h1>
              <p className="mt-6 font-semibold uppercase tracking-[0.5em] text-brand-light">
                Machine Learning Enthusiast
              </p>
            </div>
            <motion.div
              className="mt-16 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.4em] text-brand-light"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span>Scroll</span>
              <span className="block h-6 w-px bg-brand-light" />
            </motion.div>
          </motion.section>

          <motion.section
            id="about"
            className="grid gap-10 rounded-3xl border p-8 shadow-xl shadow-slate-900/5 dark:shadow-none md:grid-cols-[1fr,1.2fr]"
            {...fadeIn}
          >
            <div className="overflow-hidden rounded-2xl bg-slate-200">
              <img
                src={profileImage}
                alt="Yug Jain portrait"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div>
                {/* <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-light">About</p> */}
                <h2 className="mt-3 text-4xl font-semibold text-brand-light">About Me</h2>
                <p className={`mt-4 text-lg ${themeStyles.textMuted}`}>
                  I am an Electronics and Telecommunication undergraduate at PICT (Pune Institute of Computer Technology) with a strong academic record, currently holding a CGPA of 9.45/10. My core interests lie in Artificial Intelligence, Machine Learning, and Computer Vision, and I love building end-to-end, scalable AI systems that create real-world impact. I’m deeply passionate about using technology to solve meaningful problems and continuously strive to turn ideas into practical, efficient AI solutions.
                </p>
                <p className={`mt-4 text-lg ${themeStyles.textMuted}`}>
                  I’m currently exploring Generative AI and Transformer-based architechtures for Computer Vision, and I enjoy diving into new advancements and emerging technologies in the AI domain.
                </p>
              </div>
              {/* <div className="text-sm text-slate-500 dark:text-slate-400">
                <p>Pune, Maharashtra • 2024 – 2027</p>
                <p>Currently exploring applied ML and intelligent tooling.</p>
              </div> */}
              <div>
                <a
                  href="/Yug_Jain_Resume.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-light dark:bg-white dark:text-slate-900"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.section>

          <motion.section id="skills" className="space-y-6" {...fadeIn}>
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl font-semibold text-brand-light">Technical Skills</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill.title}
                  className={`${themeStyles.surface} rounded-2xl border ${themeStyles.border} p-6 backdrop-blur`}
                >
                  <h3 className="text-xl font-semibold">{skill.title}</h3>

                  {/* icons grid */}
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {skill.topics.map((topic) => {
                      const iconUrl = getIconUrl(topic)
                      return (
                        <div key={topic} className="flex flex-col items-center gap-2">
                          <div className="h-16 w-16 rounded-lg border border-slate-200 bg-white/60 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden">
                            {iconUrl ? (
                              <img src={iconUrl} alt={topic} className="h-10 w-10 object-contain" />
                            ) : (
                              <span className="text-sm text-slate-500">{topic.charAt(0)}</span>
                            )}
                          </div>
                          <span className="mt-1 text-xs text-slate-700 dark:text-slate-300 text-center">{topic}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section id="projects" className="space-y-8 min-h-screen" {...fadeIn}>
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl font-semibold text-brand-light">Projects</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="flex h-full min-h-[520px] flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
                >
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.4em] text-brand-light">{project.timeline}</p>
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{project.stack.join(' • ')}</p>
                  </div>
                  <p className={`${themeStyles.textMuted} flex-1 text-base`}>{project.description}</p>
                  <div className="flex gap-3 text-sm font-semibold">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full bg-brand-light px-4 py-2 text-center text-white transition hover:bg-brand-dark"
                    >
                      Project Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-center text-slate-700 transition hover:border-brand-light hover:text-brand-light dark:border-slate-700 dark:text-slate-200"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section id="achievements" className="space-y-8 min-h-screen" {...fadeIn}>
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl font-semibold text-brand-light">Achievements & Volunteering</h2>
            </div>
            <div className="flex flex-col gap-6">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <ul className="mt-4 space-y-3 text-base text-slate-600 dark:text-slate-300">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="text-brand-light">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-light/10 via-transparent to-slate-100 p-8 text-center shadow-xl shadow-brand-light/10 dark:border-slate-800 dark:from-brand-light/10 dark:to-slate-950"
            {...fadeIn}
          >
            <h2 className="text-5xl font-semibold text-brand-light">Let&apos;s collaborate</h2>
            {/* <p className={`mt-4 ${themeStyles.textMuted}`}>
              I love teaming up on research-backed builds, AI tooling, and polished UX for intelligent systems.
            </p> */}
            <div className="mt-8 flex flex-col items-center gap-3 text-lg font-medium">
              <a href={`mailto:${contactDetails.email}`} className="hover:text-brand-light">
                {contactDetails.email}
              </a>
              <a
                href={`tel:${contactDetails.phone.replace(/\\s+/g, '')}`}
                className="hover:text-brand-light"
              >
                {contactDetails.phone}
              </a>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-brand-light hover:text-brand-light dark:border-slate-700 dark:text-slate-200"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.939v5.669H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.371 4.268 5.455v6.288ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm-1.777 13.019h3.555V9H3.56v11.452Z" />
                </svg>
              </a>
              <a
                href={contactDetails.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-brand-light hover:text-brand-light dark:border-slate-700 dark:text-slate-200"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.589 2 12.229c0 4.505 2.865 8.324 6.839 9.676.5.1.682-.22.682-.486 0-.24-.01-1.04-.014-1.886-2.782.616-3.37-1.37-3.37-1.37-.455-1.175-1.11-1.488-1.11-1.488-.908-.637.069-.624.069-.624 1.004.072 1.532 1.057 1.532 1.057.893 1.561 2.344 1.11 2.915.849.092-.667.35-1.11.636-1.366-2.22-.26-4.555-1.136-4.555-5.054 0-1.116.39-2.028 1.029-2.744-.103-.26-.446-1.3.098-2.71 0 0 .84-.274 2.75 1.048A9.265 9.265 0 0 1 12 6.8c.85.004 1.705.117 2.504.344 1.91-1.322 2.748-1.048 2.748-1.048.546 1.41.202 2.45.1 2.71.64.716 1.028 1.628 1.028 2.744 0 3.93-2.339 4.792-4.566 5.046.359.32.678.95.678 1.916 0 1.385-.013 2.502-.013 2.842 0 .268.18.588.688.486A10.058 10.058 0 0 0 22 12.229C22 6.59 17.523 2 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </motion.section>
        </main>

        <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500 dark:border-slate-800">
          © 2025 Yug Jain. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default App
