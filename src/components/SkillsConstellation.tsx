import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
    color: "primary",
  },
  {
    category: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "React.js",
      "Next.js",
      "Framer Motion",
      "GSAP",
      "Three.js",
    ],
    color: "secondary",
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Flask",
      "Django",
      "REST APIs",
      "Socket.io",
    ],
    color: "accent",
  },
  {
    category: "Databases",
    skills: [
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "MongoDB",
      "Redis",
      "Firebase",
      "Supabase",
    ],
    color: "primary",
  },
  {
    category: "Data Science & ML",
    skills: [
      "Data Analysis / EDA",
      "Feature Engineering",
      "Machine Learning (ML)",
      "Deep Learning (DL)",
      "Natural Language Processing (NLP)",
      "Time Series Analysis",
      "Model Evaluation",
      "Data Visualization",
    ],
    color: "secondary",
  },
  {
    category: "Tools & Platforms",
    skills: [
      "Git / GitHub",
      "VS Code",
      "Postman",
      "Jupyter",
      "Anaconda",
      "Docker",
      "Vercel",
      "Netlify",
      "Render",
      "Heroku",
    ],
    color: "accent",
  },
];

const SkillsConstellation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (constellationRef.current) {
      const skillNodes =
        constellationRef.current.querySelectorAll(".skill-node");

      gsap.fromTo(
        skillNodes,
        { scale: 0, opacity: 0, rotateY: 180 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: constellationRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-section-title mb-6">Skills Constellation</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my technical universe - each skill interconnected in the
            vast cosmos of development
          </p>
        </motion.div>

        <div ref={constellationRef} className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {skillsData.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="space-y-4"
                initial={{ x: categoryIndex % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3
                  className={`text-lg font-semibold mb-4 text-${category.color}`}
                >
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="skill-node skill-badge cursor-hover relative group"
                      whileHover={{
                        scale: 1.1,
                        rotateX: 10,
                        rotateY: 10,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="relative z-10">{skill}</span>

                      {/* Connecting lines */}
                      {skillIndex < category.skills.length - 1 && (
                        <div
                          className={`absolute top-full left-1/2 w-0.5 h-4 bg-gradient-to-b from-${category.color} to-transparent transform -translate-x-1/2 opacity-30`}
                        ></div>
                      )}

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 bg-${category.color}/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      ></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Constellation connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient
                id="connection-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(195, 100%, 50%)" />
                <stop offset="50%" stopColor="hsl(270, 100%, 80%)" />
                <stop offset="100%" stopColor="hsl(320, 100%, 70%)" />
              </linearGradient>
            </defs>
            {/* Dynamic connection lines would be generated here */}
          </svg>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl animate-float"></div>
    </section>
  );
};

export default SkillsConstellation;
