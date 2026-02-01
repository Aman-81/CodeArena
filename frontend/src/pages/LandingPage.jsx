// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { useNavigate } from "react-router";

// Use inline SVG for icons since external libraries can't be imported in a single file
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-cyan-400">
    <path d="m18 16 4-4-4-4"></path>
    <path d="m6 8-4 4 4 4"></path>
    <path d="m14.5 4-5 16"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-fuchsia-400">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-400">
    <path d="M4.5 16.5c-1.5 1.26-2.25 2.52-2.25 3.78 0 2.4-1.5 4.5-3 6.75"></path>
    <path d="M14 2c2.7.27 4.9 2 6 4s1.3 5.4 1 8c-.8 3.3-5.2 5.5-8 5.8"></path>
    <path d="M17.5 19c-1.5 1.26-2.25 2.52-2.25 3.78 0 2.4-1.5 4.5-3 6.75"></path>
  </svg>
);

const AnimatedCodeTerminal = () => {
  const codeWords = [
    { word: "//", color: "text-gray-500" }, { word: "CodeArena", color: "text-gray-500" }, { word: "-", color: "text-gray-500" }, { word: "Where", color: "text-gray-500" }, { word: "every", color: "text-gray-500" }, { word: "line", color: "text-gray-500" }, { word: "of", color: "text-gray-500" }, { word: "code", color: "text-gray-500" }, { word: "matters.", color: "text-gray-500" }, { word: "\n" },
    { word: "#include", color: "text-blue-400" }, { word: "<iostream>", color: "text-red-400" }, { word: "\n" },
    { word: "#include", color: "text-blue-400" }, { word: "<string>", color: "text-red-400" }, { word: "\n" },
    { word: "\n" },
    { word: "using", color: "text-blue-400" }, { word: "namespace", color: "text-blue-400" }, { word: "std;", color: "text-white" }, { word: "\n" },
    { word: "\n" },
    { word: "void", color: "text-blue-400" }, { word: "ignite_passion()", color: "text-white" }, { word: "{", color: "text-white" }, { word: "\n" },
    { word: "    string", color: "text-blue-400" }, { word: "message", color: "text-white" }, { word: "=", color: "text-white" }, { word: "\"Every", color: "text-green-400" }, { word: "bug", color: "text-green-400" }, { word: "fixed", color: "text-green-400" }, { word: "is", color: "text-green-400" }, { word: "a", color: "text-green-400" }, { word: "step", color: "text-green-400" }, { word: "forward.\";", color: "text-green-400" }, { word: "\n" },
    { word: "    cout", color: "text-white" }, { word: "<<", color: "text-white" }, { word: "message", color: "text-white" }, { word: "<<", color: "text-white" }, { word: "endl;", color: "text-white" }, { word: "\n" },
    { word: "}", color: "text-white" }, { word: "\n" },
    { word: "\n" },
    { word: "int", color: "text-blue-400" }, { word: "main()", color: "text-white" }, { word: "{", color: "text-white" }, { word: "\n" },
    { word: "    ignite_passion();", color: "text-white" }, { word: "\n" },
    { word: "    return", color: "text-blue-400" }, { word: "0;", color: "text-white" }, { word: "\n" },
    { word: "}", color: "text-white" }, { word: "\n" },
  ];

  const [typedWords, setTypedWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (wordIndex < codeWords.length) {
      const timeoutId = setTimeout(() => {
        setTypedWords(prev => [...prev, codeWords[wordIndex]]);
        setWordIndex(wordIndex + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setTypedWords([]);
        setWordIndex(0);
        setAnimationKey(prev => prev + 1); // Reset animation
      }, 2000); // Delay before erasing and restarting
      return () => clearTimeout(timeoutId);
    }
  }, [wordIndex, animationKey, codeWords.length]);

  const renderWords = () => {
    let output = [];
    let lineContent = [];
    let lineKey = 0;

    typedWords.forEach((item, index) => {
      if (item.word === "\n") {
        output.push(<span key={lineKey++}>{lineContent}</span>);
        output.push(<br key={`br-${index}`} />);
        lineContent = [];
      } else {
        lineContent.push(<span key={index} className={item.color}>{item.word}&nbsp;</span>);
      }
    });

    output.push(<span key={lineKey++}>{lineContent}</span>);
    return output;
  };

  return (
    <div key={animationKey} className="bg-gray-900 p-8 sm:p-12 rounded-2xl border border-gray-700 shadow-xl overflow-hidden font-mono text-sm leading-relaxed h-[400px]">
      <pre className="h-full whitespace-pre-wrap">
        {renderWords()}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 3 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          |
        </motion.span>
      </pre>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-2xl border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-extrabold text-white flex items-center">
          {/* Logo - Updated for Vercel deployment */}
          {/* OLD (Local only): src="/src/images/Code.png" */}
          <img
            src="/images/Code.png"
            alt="CodeArena Logo"
            className="w-14 h-10 mr-3 brightness-110 contrast-110"
          />
          <span>CodeArena</span>
        </a>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
          <a href="#challenges" className="text-gray-300 hover:text-white transition-colors duration-300">Challenges</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact Us</a>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-300 hover:text-white transition-colors duration-300 hidden md:block"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 hidden md:block"
          >
            Sign Up
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-4 border-t border-gray-800">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#challenges" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setIsOpen(false)}>Challenges</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setIsOpen(false)}>Contact Us</a>
            <button
              onClick={() => {
                navigate('/login');
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate('/signup');
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-left"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  const translateYHero = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const testimonials = [
    { name: "Divyanshi Verma", quote: "CodeArena transformed how my team approaches coding challenges. The real-time feedback is invaluable.", avatar: "https://placehold.co/40x40/007bff/fff?text=DV" },
    { name: "Abhishek Sahu", quote: "The community is incredible. I've learned so much just by competing and collaborating with other developers.", avatar: "https://placehold.co/40x40/ff69b4/fff?text=AS" },
    {
      name: "Diya Shukla",
      quote: "The challenges on CodeArena keep me motivated. Every problem feels like a new opportunity to grow and sharpen my skills.",
      avatar: "https://placehold.co/40x40/17a2b8/fff?text=DS"
    }
  ];

  const challenges = [
    { id: 1, title: "Find the Longest Substring", difficulty: "Easy", description: "Given a string, find the length of the longest substring without repeating characters." },
    { id: 2, title: "Binary Search Tree", difficulty: "Medium", description: "Implement a binary search tree from scratch and perform basic operations." },
    { id: 3, title: "Graph Traversal", difficulty: "Hard", description: "Find the shortest path between two nodes in a weighted graph using Dijkstra's algorithm." },
  ];

  const languages = [
    {
      name: "JavaScript",
      // OLD (Local only): src="/src/images/javascript.png"
      icon: <img src="/images/javascript.png" alt="JavaScript" className="w-16 h-16 object-contain" />
    },
    {
      name: "Python",
      // OLD (Local only): src="/src/images/python.webp"
      icon: <img src="/images/python.webp" alt="Python" className="w-16 h-16 object-contain" />
    },
    {
      name: "Java",
      // OLD (Local only): src="/src/images/java_icon.png"
      icon: <img src="/images/java_icon.png" alt="Java" className="w-16 h-16 object-contain" />
    },
    {
      name: "C++",
      // OLD (Local only): src="/src/images/cpp_icon.png"
      icon: <img src="/images/cpp_icon.png" alt="C++" className="w-16 h-16 object-contain" />
    },
  ];

  return (
    <div className="bg-gray-950 text-white font-sans overflow-x-hidden relative">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'Fira Code', monospace; }
          .bg-radial-gradient-hero {
            background: radial-gradient(circle at center, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0) 70%), 
                        radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0) 70%),
                        radial-gradient(circle at top left, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0) 70%);
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s infinite ease-in-out;
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.05); opacity: 0.4; }
          }
        `}
      </style>

      {/* Background orbs from login page */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse-slow"
          initial={{ y: 0, opacity: 0.2 }}
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl animate-pulse-slow"
          initial={{ y: 0, opacity: 0.2 }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Navbar />
      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-950 bg-radial-gradient-hero relative"
          style={{ translateY: translateYHero, opacity: opacityHero }}
        >
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-4xl mx-auto pt-20">
            <motion.h1
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white mb-4 drop-shadow-lg"
            >
              Unlock Your Potential. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Master Code.</span>
            </motion.h1>
            <motion.p
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8"
            >
              CodeArena is the ultimate platform for developers to sharpen their skills, collaborate on challenges, and climb the leaderboards.
            </motion.p>
            <motion.button
              onClick={() => navigate('/signup')}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59,130,246,0.4)" }}
              className="inline-flex items-center space-x-2 px-8 py-4 font-bold text-lg rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 transform hover:bg-blue-700"
            >
              <span>Join the Arena</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Interactive Code Terminal Section */}
        <section className="py-20 bg-gray-950 px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroTextVariants} className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Code, Collaborate, Compete</h2>
            <p className="text-lg text-gray-400">
              Our platform is built to give you the ultimate coding experience. See for yourself.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={heroTextVariants}
            className="max-w-4xl mx-auto h-[400px]"
          >
            <AnimatedCodeTerminal />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-950 px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroTextVariants} className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Features Built for Developers</h2>
            <p className="text-lg text-gray-400">
              From real-time collaboration to advanced analytics, CodeArena provides everything you need to become a better coder.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={featureVariants}
              custom={0}
              className="p-8 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="mb-4">
                <CodeIcon />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Collaboration</h3>
              <p className="text-gray-400">
                Work on challenges with your friends in a shared coding environment, perfect for pair programming.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={featureVariants}
              custom={1}
              className="p-8 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="mb-4">
                <RocketIcon />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Competitive Leaderboards</h3>
              <p className="text-gray-400">
                Test your skills against a global community of developers and see where you rank.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={featureVariants}
              custom={2}
              className="p-8 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="mb-4">
                <UserIcon />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Learning</h3>
              <p className="text-gray-400">
                Receive custom challenges and insights based on your progress and weaknesses.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Code Challenges Section */}
        <section id="challenges" className="py-20 bg-gray-950 px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroTextVariants} className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Challenge Your Limits</h2>
            <p className="text-lg text-gray-400">
              Dive into a vast library of coding challenges designed to sharpen your problem-solving skills.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={featureVariants}
                custom={index}
                className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
                <p className={`text-sm font-medium mb-2 w-fit px-2 py-1 rounded-full ${challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                  {challenge.difficulty}
                </p>
                <p className="text-gray-400">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Supported Languages Section */}
        <section className="py-20 bg-gray-950 px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroTextVariants} className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Languages You Can Master</h2>
            <p className="text-lg text-gray-400">
              Practice and perfect your skills in a variety of popular programming languages.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={featureVariants}
                custom={index}
                className="flex flex-col items-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl transition-all duration-300 hover:scale-105"
              >
                {language.icon}
                <p className="mt-4 text-white font-semibold">{language.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-950 px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroTextVariants} className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-400">
              Join thousands of developers who are already leveling up their skills with CodeArena.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={featureVariants}
                custom={index}
                className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl"
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="rounded-full w-10 h-10 border-2 border-white/20" />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">CodeArena User</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-950 px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={heroTextVariants} className="text-center max-w-4xl mx-auto p-12 bg-gray-800/50 rounded-3xl border border-gray-700 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Master Your Craft?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Start your journey today and become the developer you've always wanted to be.
            </p>
            <motion.button
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59,130,246,0.4)" }}
              className="inline-block px-10 py-4 font-bold text-lg rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 transform hover:bg-blue-700"
            >
              Sign Up Now
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-950 py-12 px-4 text-center border-t border-gray-800">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="text-white text-2xl font-bold">CodeArena</div>
              <p className="text-gray-400 max-w-xs">
                The ultimate platform to sharpen your coding skills and connect with a global community.
              </p>
            </div>
            <div className="flex space-x-6 md:space-x-8 text-sm">
              <div className="flex flex-col space-y-2 items-center">
                <p className="font-semibold text-white">Contact Us</p>
                <a href="mailto:your-email@example.com" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-6 h-6"></div>
                </a>
                <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-6 h-6"></div>
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">© 2025 CodeArena. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;