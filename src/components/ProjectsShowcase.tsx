import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Code2, Sparkles } from "lucide-react";

import taskflowImg from "@/assets/taskflow.png";
import omniaiImg from "@/assets/omniai.png";
import collabxImg from "@/assets/collabx.png";
import edutradeImg from "@/assets/edutrade.png";
import analyticaxImg from "@/assets/analyticax.png";
import iplpredictorImg from "@/assets/iplscorepredictor.png";
import snakegameImg from "@/assets/snakegame.png";
import recipehubImg from "@/assets/recipehub.png";
import sudokusolverImg from "@/assets/sudokusolver.png";
import simongameImg from "@/assets/simongame.png";
import drumkitImg from "@/assets/drumkit.png";
import keeperImg from "@/assets/keeper.png";
import documindaiImg from "@/assets/documindai.png";
import researchmindImg from "@/assets/researchmind.png";
import vislidesImg from "@/assets/vislides.png";

const projects = [
  {
    id: 1,
    title: "EduTrade",
    category: "Web Dev",
    description:
      "EduTrade is a production-ready MERN marketplace enabling students to securely buy and sell academic resources. It features JWT-based authentication, real-time messaging via Socket.io, cloud image optimization, and a modular Express API architecture for scalable backend operations.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.io", "ImageKit"],
    image: edutradeImg,
    gradient: "from-indigo-500 to-purple-600",
    github: "https://github.com/Vikas-Sharma04/EduTrade",
    live: "https://edutrade-vs.vercel.app/",
  },
  {
    id: 2,
    title: "VI-Slides",
    category: "Web Dev",
    description:
      "VI-Slides is a real-time student-teacher interaction platform enabling live sessions with screen sharing, audio, whiteboard, polls, assignments, AI powered Q&A, todos, and notifications. Built using WebRTC and Socket.IO for low-latency, seamless real-time communication.",
    tech: ["React.js", "WebRTC", "Socket.IO", "Node.js", "Express.js", "Tailwind CSS", "TypeScript"],
    image: vislidesImg,
    gradient: "from-violet-500 to-purple-600",
    github: "https://github.com/Vikas-Sharma04/Vi-Slides",
    live: "https://vi-slides-vs.vercel.app",
  },
  {
    id: 3,
    title: "DocuMind AI",
    category: "AI/ML",
    description:
      "DocuMind AI is a premium platform transforming PDFs into interactive partners using LangChain, ChromaDB, and RAG. It features a sleek dark UI, automated ingestion with real-time vector processing, and three intelligent modes: Chat for general queries, RAG Search for fact-finding, and Consultant mode for thematic analysis.",
      tech: ["LangChain", "ChromaDB", "RAG", "Python", "Streamlit", "Vector Processing"],
      image: documindaiImg,
    gradient: "from-blue-500 to-cyan-600",
    github: "https://github.com/Vikas-Sharma04/DocuMind-AI",
    live: "https://docu-mind-ai-vs.streamlit.app/",
  },
  {
    id: 4,
    title: "AnalyticaX",
    category: "Python",
    description:
      "AnalyticaX is an advanced data analytics platform that transforms raw datasets into interactive dashboards and automated statistical summaries. Supports dynamic filtering, aggregation, and visualization using Plotly and Streamlit for business-ready insights. Also integrated with an AI-powered code editor.",
    tech: ["Python", "Pandas", "NumPy", "Plotly", "Matplotlib", "Streamlit"],
    image: analyticaxImg,
    gradient: "from-emerald-500 to-teal-600",
    github: "https://github.com/Vikas-Sharma04/AnalyticaX",
    live: "https://analyticax.streamlit.app/",
  },
  {
    id: 5,
    title: "ResearchMind",
    category: "AI/ML",
    description:
      "Advanced multi-agent AI research system powered by Mistral, Tavily, and BeautifulSoup. This platform features a dynamic horizontal pipeline where specialized agents collaborate to search, scrape, write, and critique deep technical reports in real-time. Built with LangChain and Streamlit for professional, high-speed research.",
    tech: ["Mistral", "Tavily", "BeautifulSoup", "LangChain", "Python", "Streamlit"],
    image: researchmindImg,
    gradient: "from-amber-500 to-orange-600",
    github: "https://github.com/Vikas-Sharma04/ResearchMind",
    live: "https://researchmind-vs.streamlit.app/",
  },
  {
    id: 6,
    title: "CollabX",
    category: "Web Dev",
    description:
      "CollabX is a scalable brand–influencer collaboration platform built on the MERN stack. It includes secure JWT authentication, campaign lifecycle management APIs, optimized MongoDB indexing, and real-time communication features for high-performance matching.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    image: collabxImg,
    gradient: "from-pink-500 to-rose-500",
    github: "https://github.com/Vikas-Sharma04/CollabX",
    live: "https://collabx-vs.vercel.app/",
  },
  {
    id: 7,
    title: "IPL Match Predictor",
    category: "AI/ML",
    description:
      "A machine learning-driven prediction engine that estimates second-innings IPL scores using advanced feature engineering on match metrics like run rate, wickets, and venue patterns. Integrated into an interactive Streamlit application for real-time predictive analytics.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Streamlit"],
    image: iplpredictorImg,
    gradient: "from-orange-500 to-red-600",
    github: "https://github.com/Vikas-Sharma04/IPL_Match_Score_Predictor",
    live: "https://ipl-match-score-predictor-vs.streamlit.app/",
  },
  {
    id: 8,
    title: "RecipeHub",
    category: "Web Dev",
    description:
      "RecipeHub is a full-stack recipe discovery platform supporting ingredient-based search and AI-powered recommendations using Gemini API. Built with a RESTful Express backend, optimized MongoDB queries, and a responsive Tailwind UI for seamless user experience.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Gemini API"],
    image: recipehubImg,
    gradient: "from-orange-400 to-yellow-600",
    github: "https://github.com/Vikas-Sharma04/RecipeHub",
    live: "https://recipe-hub-vs.vercel.app/",
  },
  {
    id: 9,
    title: "OmniAI",
    category: "Web Dev",
    description:
      "OmniAI is a full-stack AI-powered content platform leveraging Google Gemini API for intelligent content generation and resume optimization. Designed with secure authentication, structured REST APIs, and PostgreSQL-backed persistence for scalable AI-driven workflows.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Gemini API", "Clerk Auth"],
    image: omniaiImg,
    gradient: "from-purple-500 to-pink-500",
    github: "https://github.com/Vikas-Sharma04/OmniAI",
    live: "https://omni-ai-zeta.vercel.app",
  },
  {
    id: 10,
    title: "Snake Game",
    category: "Python",
    description:
      "An object-oriented implementation of the classic Snake arcade game featuring structured game loops, real-time collision detection, modular state management, and event-driven input handling using Pygame.",
    tech: ["Python", "OOP", "Pygame"],
    image: snakegameImg,
    gradient: "from-green-400 to-blue-500",
    github: "https://github.com/Vikas-Sharma04/snake-game-pygame",
    live: "https://snake-game-pygame.vercel.app/",
  },
  {
    id: 11,
    title: "TaskFlow",
    category: "Web Dev",
    description:
      "TaskFlow is a scalable task management system built with a React frontend and modular backend architecture. It supports intelligent task filtering, Pomodoro productivity tracking, offline-first PWA capabilities, and efficient state synchronization.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "MongoDB", "PWA"],
    image: taskflowImg,
    gradient: "from-blue-500 to-purple-600",
    github: "https://github.com/Vikas-Sharma04/TaskFlow",
    live: "https://taskflow-vs.vercel.app/",
  },
  {
    id: 12,
    title: "Sudoku Solver",
    category: "Mini Projects",
    description:
      "A real-time visualization tool implementing the Backtracking algorithm to solve complex Sudoku puzzles step-by-step with dynamic rendering and algorithm tracing.",
    tech: ["React.js", "JavaScript", "Backtracking Algorithm"],
    image: sudokusolverImg,
    gradient: "from-cyan-500 to-blue-600",
    github: "https://github.com/Vikas-Sharma04/Sudoku-Solver",
    live: "http://sudoku-solver-vs.vercel.app/",
  },
  {
    id: 13,
    title: "Simon Game",
    category: "Mini Projects",
    description:
      "An interactive memory-based browser game that dynamically generates and validates sequential patterns using event-driven JavaScript and DOM manipulation.",
    tech: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    image: simongameImg,
    gradient: "from-red-400 to-purple-500",
    github: "https://github.com/Vikas-Sharma04/SimonGame",
    live: "https://vikas-sharma04.github.io/SimonGame/",
  },
  {
    id: 14,
    title: "DrumKit",
    category: "Mini Projects",
    description:
      "A keyboard-interactive soundboard application that maps key events to audio playback with responsive UI animations and optimized DOM handling.",
    tech: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    image: drumkitImg,
    gradient: "from-pink-400 to-rose-600",
    github: "https://github.com/Vikas-Sharma04/DrumKit",
    live: "https://vikas-sharma04.github.io/DrumKit/",
  },
  {
    id: 15,
    title: "Keeper App",
    category: "Mini Projects",
    description:
      "A responsive note-taking application inspired by Google Keep, built using React component architecture with dynamic state management and clean UI design.",
    tech: ["React.js", "Material UI", "JavaScript"],
    image: keeperImg,
    gradient: "from-yellow-400 to-amber-600",
    github: "https://github.com/Vikas-Sharma04/Keeper_App",
    live: "https://vikas-sharma04.github.io/Keeper_App/",
  },
];

const categories = ["All", "Web Dev", "AI/ML", "Python", "Mini Projects"];

const ProjectsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleViewLess = () => {
    setVisibleCount(4);
    // Smooth scroll back to top of projects section
    const section = document.getElementById("projects-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="projects-section" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(4);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className="card-project group"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { delay: (index % 4) * 0.1 } 
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                {/* Project Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-background/50 to-background/30">
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10`}></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Project Content */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-glow group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-hover"
                    whileHover={{ x: 5 }}
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>

                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors cursor-hover"
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </motion.a>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Pagination Buttons */}
        <div className="flex justify-center mt-20 h-12">
          <AnimatePresence mode="wait">
            {filteredProjects.length > visibleCount ? (
              <motion.button
                key="view-more"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewMore}
                className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold shadow-lg shadow-primary/10"
              >
                View More Projects
              </motion.button>
            ) : filteredProjects.length > 4 ? (
              <motion.button
                key="view-less"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewLess}
                className="px-8 py-3 rounded-full border border-primary/50 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 font-semibold"
              >
                View Less
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;