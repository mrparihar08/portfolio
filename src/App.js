import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import emailjs from "emailjs-com";

// Single-file, production-ready React component (Tailwind + Framer Motion)
// Designed for: Kelly Jesse Munjee — fully animated, responsive, minimal portfolio

export default function PortfolioApp() {
  const [dark, setDark] = useState(false);
  const form = useRef();
  const [status, setStatus] = useState({ sent: false, error: "" });

  const SKILLS = [
    { name: "React.js", pct: 45 },
    { name: "JavaScript", pct: 40 },
    { name: "Data Science", pct: 60 },
    { name: "Node.js", pct: 80 },
    { name: "Python", pct: 85 },
    { name: "Design / UI", pct: 65 },
  ];

  const PROJECTS = [
    {
      title: "Pulse — Analytics Dashboard",
      desc: "Realtime metrics dashboard with WebSocket feeds and custom visualizations.",
      link: "#",
      tech: ["React", "D3", "Node"]
    },
    {
      title: "Vitya Finance — Personal Finance App",
      desc: "Full-stack expense & goal tracker with ML-powered suggestions.",
      link: "#",
      tech: ["React", "Flask", "Postgres"]
    },
    {
      title: "Studio Portfolio — Marketing Site",
      desc: "A minimal marketing site with a performant CMS and delightful micro-interactions.",
      link: "#",
      tech: ["Next.js", "Tailwind"]
    }
  ];

  const TESTIMONIALS = [
   // { name: "Asha Kapoor", role: "Product Lead", quote: "Kelly's delivery and detail orientation lifted our product." },
   // { name: "Marcus Lee", role: "CTO", quote: "A creative engineer who cares about UX and reliability." }
  ];

  const TIMELINE = [
    { date: "2025 — Present", title: "Full-Stack Developer", org: "H+", desc: "Built core platform features, Analysis work and backend services." },
    { date: "2024 — 2025", title: "Full-Stack Developer", org: "Vitya-AI", desc: "Built core platform features and backend services." },
    
  ];

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
  };
  const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  function sendEmail(e) {
    e.preventDefault();
    setStatus({ sent: false, error: "" });
    if (!form.current) return;
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus({ sent: true, error: "" });
      form.current.reset();
    }).catch((err) => {
      console.error(err);
      setStatus({ sent: false, error: "Failed to send — please try again later." });
    });
  }

  return (
    <div className={dark ? "dark bg-gray-900 text-gray-100 min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      {/* Top navigation */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/60 dark:bg-gray-900/60 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">PP</div>
            <div>
              <h1 className="text-lg font-semibold">Pradeep Parihar</h1>
              <p className="text-xs text-gray-600 dark:text-gray-300"> Data analyst & Python developer </p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center text-sm">
            <ScrollLink to="about" smooth duration={600} className="cursor-pointer">About</ScrollLink>
            <ScrollLink to="skills" smooth duration={600} className="cursor-pointer">Skills</ScrollLink>
            <ScrollLink to="projects" smooth duration={600} className="cursor-pointer">Projects</ScrollLink>
            <ScrollLink to="resume" smooth duration={600} className="cursor-pointer">Resume</ScrollLink>
            <ScrollLink to="contact" smooth duration={600} className="cursor-pointer">Contact</ScrollLink>
            <button
              onClick={() => setDark(!dark)}
              className="ml-4 px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm shadow-md"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </nav>

          {/* Mobile menu: simplified */}
          <div className="md:hidden">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">Top</button>
          </div>
        </div>
      </motion.header>

      {/* HERO / Landing */}
      <section id="hero" className="relative overflow-hidden">
        {/* animated floating shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.span
            animate={{ x: [0, 40, -20, 0], y: [0, -10, 10, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute left-8 top-20 w-44 h-44 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-300 opacity-20 blur-3xl"
          />
          <motion.span
            animate={{ x: [0, -30, 30, 0], y: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute right-4 top-36 w-28 h-28 rounded-full bg-gradient-to-br from-pink-300 to-red-300 opacity-25 blur-2xl"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Hi — I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Pradeep Parihar</span></h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">I design and build accessible, motion-rich interfaces — teams call me the "micro-interaction engineer" And Data Analytics.</p>

              <div className="mt-6 flex gap-4">
                <ScrollLink to="projects" smooth duration={700} className="inline-block px-5 py-3 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium cursor-pointer shadow-lg">See my work</ScrollLink>
                <a href="#contact" className="inline-block px-5 py-3 rounded-md border border-gray-200 dark:border-gray-700 text-sm">Get in touch</a>
              </div>

              <div className="mt-8 flex gap-4 items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 0 0 2 2h14"/></svg>
                  <span>Available for freelance & full-time</span>
                </div>
              </div>
            </motion.div>

            {/* Animated profile card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex justify-center md:justify-end"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 6 }}
                className="w-72 md:w-80 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-800"
              >
                <motion.img
                  src ="pradeep-parihar-from-At-Post-office-Rondha-Betul.jpg"
                  alt="pradeep parihar"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-900 shadow-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <h3 className="text-center mt-4 font-semibold text-lg">Pradeep Parihar</h3>
                <p className="text-center text-sm mt-1 text-gray-500 dark:text-gray-300">Motion-first Python developer </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center text-gray-600 dark:text-gray-400">
                  <div>
                    <div className="font-semibold">Fresher</div>
                    <div className="text-[11px]">Years</div>
                  </div>
                  <div>
                    <div className="font-semibold">2+</div>
                    <div className="text-[11px]">Projects</div>
                  </div>
                  <div>
                    <div className="font-semibold"></div>
                    <div className="text-[11px]"></div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <motion.section id="about" className="max-w-4xl mx-auto px-6 py-16" initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
        <motion.h3 variants={item} className="text-2xl font-bold mb-4">About Me</motion.h3>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300 leading-relaxed">I’m Pradeep — I focus on crafting polished user experiences with thoughtful motion. My work sits at the intersection of product design and engineering: shipping delightful, usable interfaces that scale. I love small micro-interactions that make products feel alive.</motion.p>

        <motion.div variants={item} className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">I specialize in:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li> Data analyst And ML projects </li>
              <li> Backend Developer in python </li>
              <li>Frontend architecture and accessibility</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-300">When I’m not coding I enjoy photography, longboarding, and exploring local cafés for people-watching and ideas.</p>
          </div>
        </motion.div>
      </motion.section>

      {/* SKILLS */}
      <section id="skills" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/95 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold mb-6">Skills</motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {SKILLS.map((s, idx) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-sm text-gray-500">{s.pct}%</div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-3 bg-gradient-to-r from-indigo-500 to-blue-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h4 className="font-semibold">Tools & Libraries</h4>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-center text-gray-600 dark:text-gray-300">
                {['Numpy','pandas', 'React', ' Matplotlib', ' syktlearn', 'fastAPI' ].map(t => (
                  <div key={t} className="p-2 rounded-md border border-gray-100 dark:border-gray-700">{t}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold mb-6">Projects</motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -6, rotateY: 6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg border border-gray-100 dark:border-gray-800 transform-gpu"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                </div>
                <div className="ml-4 text-xs text-gray-400 group-hover:text-indigo-400">→</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map(t => (<span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">{t}</span>))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* RESUME / TIMELINE */}
      <section id="resume" className="bg-gray-50 dark:bg-gray-900/95 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-6">Experience</motion.h3>

          <div className="space-y-6">
            {TIMELINE.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{t.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{t.org}</p>
                  </div>
                  <div className="text-xs text-gray-400">{t.date}</div>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-12">
        <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-6">Testimonials</motion.h3>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="italic">“{t.quote}”</p>
              <div className="mt-4 text-sm font-semibold">{t.name} <span className="text-xs font-normal text-gray-500">— {t.role}</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-16">
        <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-4">Contact</motion.h3>

        <motion.form ref={form} onSubmit={sendEmail} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4 border border-gray-100 dark:border-gray-800">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.input whileFocus={{ scale: 1.01 }} name="user_name" placeholder="Your name" required className="p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent" />
            <motion.input whileFocus={{ scale: 1.01 }} name="user_email" type="email" placeholder="Email" required className="p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent" />
          </div>
          <motion.textarea whileFocus={{ scale: 1.01 }} name="message" rows={5} placeholder="How can I help?" required className="w-full p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent" />

          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.03 }} type="submit" className="px-5 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium shadow">Send Message</motion.button>
            {status.sent && <div className="text-green-500 text-sm">✅ Sent</div>}
            {status.error && <div className="text-red-500 text-sm">{status.error}</div>}
          </div>
        </motion.form>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">Prefer email? <a href="mailto:hello@kellymunjee.com" className="underline">pradeep081020parihar@gmail.com</a></div>
      </section>

      {/* FOOTER */}
      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">© 2025 pradeep parihar — All rights reserved.</div>
          <div className="flex gap-3">
            {/* animated social icons */}
            {['twitter','linkedin','github'].map((s, i) => (
              <motion.a key={s} whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }} href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1" /></svg>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
