import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import emailjs from "emailjs-com";

function App() {
  const [dark, setDark] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const form = useRef();   // 🔥 form reference

  const sendEmail = (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSent(true);
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("Email error:", err);
          setError("❌ Failed to send message. Try again!");
        }
      );
  };

  return (
    <div className={dark ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      {/* Header */}
      <motion.header
        className="bg-white dark:bg-gray-800 shadow p-5 flex justify-between items-center sticky top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">My Portfolio</h1>
        <nav className="space-x-6 hidden md:block">
          <Link to="about" smooth duration={600} className="cursor-pointer">About</Link>
          <Link to="skills" smooth duration={600} className="cursor-pointer">Skills</Link>
          <Link to="projects" smooth duration={600} className="cursor-pointer">Projects</Link>
          <Link to="contact" smooth duration={600} className="cursor-pointer">Contact</Link>
        </nav>
        <button
          onClick={() => setDark(!dark)}
          className="ml-4 px-4 py-2 rounded bg-blue-600 text-white dark:bg-blue-500"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </motion.header>

      {/* Hero */}
      <motion.section
        id="hero"
        className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl font-bold">Hi, I'm Pradeep 👋</h2>
        <p className="mt-4 text-lg">Website Developer | Python Backend Developer</p>
        <Link
          to="projects"
          smooth
          duration={700}
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold cursor-pointer"
        >
          View My Work
        </Link>
      </motion.section>

      {/* About */}
      <motion.section id="about" className="p-10 bg-white dark:bg-gray-800">
        <h3 className="text-2xl font-bold mb-4">About Me</h3>
        <p>
          I'm a passionate full-stack developer specializing in React (Frontend)
          and Python (Backend - Django/Flask/FastAPI). I love building scalable
          applications and solving real-world problems with clean code.
        </p>
      </motion.section>

      {/* Skills */}
      <motion.section id="skills" className="p-10 bg-gray-100 dark:bg-gray-900">
        <h3 className="text-2xl font-bold mb-4">Skills</h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["React JS","JavaScript","HTML & CSS","Python","Django / Flask","REST API","SQL / MongoDB","Git / GitHub"].map((skill,i)=>(
            <motion.li key={i} whileHover={{ scale:1.05 }}
              className="bg-white dark:bg-gray-700 p-4 rounded shadow text-center font-medium">
              {skill}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Projects */}
      <motion.section id="projects" className="p-10 bg-white dark:bg-gray-800">
        <h3 className="text-2xl font-bold mb-6">Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow">
            <h4 className="font-bold text-lg">Expense Tracker</h4>
            <p className="mt-2">A full-stack expense tracking app built with React + Django REST.</p>
            <a href="https://github.com/yourusername/expense-tracker" className="text-blue-600 dark:text-blue-400 mt-3 inline-block">
              View Code →
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow">
            <h4 className="font-bold text-lg">Portfolio Website</h4>
            <p className="mt-2">Personal portfolio built in React JS with animations + dark mode.</p>
            <a href="https://your-portfolio-link.com" className="text-blue-600 dark:text-blue-400 mt-3 inline-block">
              Live Demo →
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section id="contact" className="p-10 bg-gray-100 dark:bg-gray-900 text-center">
        <h3 className="text-2xl font-bold mb-4">Contact Me</h3>
        <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto space-y-4">
          <input type="text" name="name" placeholder="Your Name" value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            required className="w-full p-3 rounded border dark:bg-gray-700" />
          <input type="email" name="email" placeholder="Your Email" value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            required className="w-full p-3 rounded border dark:bg-gray-700" />
          <textarea name="message" placeholder="Your Message" rows="4" value={formData.message}
            onChange={(e)=>setFormData({...formData,message:e.target.value})}
            required className="w-full p-3 rounded border dark:bg-gray-700"></textarea>
          <motion.button type="submit" whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
            Send Message
          </motion.button>
        </form>
        {sent && <p className="mt-4 text-green-500 font-semibold">✅ Message Sent Successfully!</p>}
        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
      </motion.section>

      {/* Footer */}
      <motion.footer className="bg-blue-600 dark:bg-blue-500 text-white text-center py-4 mt-10">
        © 2025 Pradeep Parihar | All Rights Reserved
      </motion.footer>
    </div>
  );
}

export default App;
