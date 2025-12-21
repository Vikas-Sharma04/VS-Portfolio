import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import taskflowImg from "@/assets/taskflow.png";
import omniaiImg from "@/assets/omniai.png";
import collabxImg from "@/assets/collabx.png";
import edutradeImg from "@/assets/edutrade.png";

const projects = [
  {
    id: 1,
    title: "TaskFlow",
    description:
      "TaskFlow is a productivity app that helps users manage tasks efficiently. It features smart filtering, Pomodoro timers, and real-time updates, with offline PWA support for uninterrupted workflow. Stay focused, organized, and productive anytime, anywhere.",
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "LocalStorage",
      "PWA",
    ],
    image: taskflowImg,
    gradient: "from-blue-500 to-purple-600",
    github: "https://github.com/Vikas-Sharma04/TaskFlow",
    live: "https://taskflow-vs.vercel.app/",
  },
  {
    id: 2,
    title: "OmniAI",
    description:
      "OmniAI is an AI-powered content creation platform that assists in writing articles, generating blog titles, and optimizing resumes using Google Gemini API. With real-time AI suggestions and a personalized dashboard, it streamlines content creation for creators and professionals.",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Gemini API",
    ],
    image: omniaiImg,
    gradient: "from-purple-500 to-pink-500",
    github: "https://github.com/Vikas-Sharma04/OmniAI",
    live: "https://omni-ai-zeta.vercel.app",
  },
  {
    id: 3,
    title: "CollabX",
    description:
      "CollabX is a collaboration platform connecting brands with influencers for partnerships and campaigns. It simplifies discovery, communication, and deal management through an intuitive interface, bridging the gap between opportunity and talent in the creator economy.",
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    image: collabxImg,
    gradient: "from-pink-500 to-rose-500",
    github: "https://github.com/Vikas-Sharma04/CollabX",
    live: "https://collabx-vs.vercel.app/",
  },
  {
    id: 4,
    title: "EduTrade",
    description:
      "EduTrade is an e-commerce platform for students to buy and sell textbooks, notes, and academic resources. With secure authentication, chat integration, and intuitive listings, it creates a safe, efficient, and sustainable academic trading ecosystem.",
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "ImageKit",
    ],
    image: edutradeImg,
    gradient: "from-indigo-500 to-purple-600",
    github: "https://github.com/Vikas-Sharma04/EduTrade",
    live: "https://edutrade-vs.vercel.app/",
  },
];

const ProjectsShowcase = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-section-title mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that blend creativity with
            cutting-edge technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card-project group"
              initial={{ y: 100, opacity: 0, rotateY: -15 }}
              whileInView={{ y: 0, opacity: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              {/* Project Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-background/50 to-background/30">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10`}
                ></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <h3 className="text-2xl font-bold mb-4 text-glow group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>

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
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-hover"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm">Code</span>
                </motion.a>

                <motion.a
                  href={project.live}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors cursor-hover"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm">Live Demo</span>
                </motion.a>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
