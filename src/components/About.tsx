import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Rocket, Heart, Sparkles } from "lucide-react";
import { useRef } from "react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Developer",
    description: "Building modern web apps with scalable, production-ready architecture.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Rocket,
    title: "Problem Solver",
    description: "Designing efficient, scalable solutions to complex problems.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Heart,
    title: "Passionate Coder",
    description: "Crafting maintainable code for web and AI projects.",
    color: "from-red-500 to-orange-400",
  },
  {
    icon: Sparkles,
    title: "Innovation Driven",
    description: "Leveraging AI, ML, and cloud technologies for impactful solutions.",
    color: "from-emerald-500 to-teal-400",
  },
];

// Interactive Card Component
const HighlightCard = ({ item, index }: { item: typeof highlights[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-pointer"
    >
      {/* Background Glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-500`} />
      
      <div className="relative h-full bg-[#0d1117]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl overflow-hidden">
        {/* Animated Gradient Spot */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
            <div className="w-full h-full bg-[#0d1117] rounded-2xl flex items-center justify-center">
              <item.icon className="w-7 h-7 text-white" />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            The Person Behind The Code
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm <span className="text-white font-medium">Vikas Sharma</span>, 
            an engineer who bridges the gap between complex backend logic and 
            intuitive frontend design. I don't just write code; I build 
            <span className="text-primary italic"> scalable digital ecosystems.</span>
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {highlights.map((item, index) => (
            <HighlightCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Floating Bio Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 p-8 rounded-3xl border border-white/5 bg-white/5 max-w-4xl mx-auto text-center backdrop-blur-sm"
        >
          <p className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.2em] mb-4">
            My Philosophy
          </p>
          <p className="text-xl italic font-light text-white/80">
            "Software is a tool for humans. If it isn't simple, scalable, and reliable, it isn't finished."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;