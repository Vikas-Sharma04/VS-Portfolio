import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "C / C++", level: 85 }, { name: "Python", level: 95 }, 
      { name: "JavaScript", level: 92 }, { name: "TypeScript", level: 90 }, { name: "SQL", level: 85 }
    ],
    color: "from-blue-500 to-cyan-400",
  },
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 }, { name: "Redux", level: 88 }, 
      { name: "Tailwind / CSS", level: 95 }, { name: "Three.js / GSAP", level: 82 }
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "ML (Scikit / XGBoost)", level: 92 }, { name: "DL (TF / PyTorch)", level: 85 }, 
      { name: "NLP (Transformers)", level: 88 }, { name: "LLMs", level: 90 }
    ],
    color: "from-rose-500 to-orange-500",
  },
  {
    category: "Backend & Servers",
    skills: [
      { name: "Node / Express", level: 90 }, { name: "FastAPI / Flask", level: 88 }, 
      { name: "Socket.io", level: 80 }, { name: "Auth (JWT/OAuth)", level: 85 }
    ],
    color: "from-emerald-500 to-teal-400",
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL / MySQL", level: 88 }, { name: "MongoDB", level: 90 }, 
      { name: "Redis", level: 75 }, { name: "Supabase", level: 88 }
    ],
    color: "from-yellow-400 to-orange-600",
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub", level: 95 }, { name: "Docker", level: 82 }, 
      { name: "Linux / Bash", level: 85 }, { name: "Vercel / Render", level: 92 }
    ],
    color: "from-indigo-500 to-blue-600",
  },
];

const SkillCard = ({ group, index }: { group: typeof skillsData[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-default skill-card"
    >
      {/* Outer Glow (Matching your About cards) */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${group.color} rounded-[2rem] blur opacity-10 group-hover:opacity-40 transition duration-500`} />
      
      <div className="relative h-full bg-[#0d1117]/90 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl overflow-hidden">
        {/* Animated Gradient Spot */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${group.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

        <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
          <h3 className={`text-xl font-bold uppercase tracking-tighter mb-8 border-b border-white/5 pb-4 bg-clip-text text-transparent bg-gradient-to-r ${group.color}`}>
            {group.category}
          </h3>

          <div className="space-y-6">
            {group.skills.map((skill, idx) => (
              <div key={idx} className="group/item">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-400 group-hover/item:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
                </div>
                
                {/* Progress Bar with Glow */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className={`bar-fill h-full bg-gradient-to-r ${group.color} rounded-full relative`}
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 blur-[2px]" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsConstellation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic entry animation
      gsap.from(".skill-card", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Progress bar fill animation
      gsap.from(".bar-fill", {
        width: "0%",
        duration: 2,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 relative z-20 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header - Perfectly Centered */}
<div className="mb-24 text-center max-w-4xl mx-auto">
  <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 tracking-tight">
    Technical Ecosystem
  </h2>
  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
    Organized by domain and <span className="text-white font-medium">interconnected by experience. </span> 
    I leverage these tools to build <span className="text-primary italic">high-performance, scalable systems.</span>
  </p>
</div>
        {/* 3D Bento Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "1200px" }}
        >
          {skillsData.map((group, i) => (
            <SkillCard key={i} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;