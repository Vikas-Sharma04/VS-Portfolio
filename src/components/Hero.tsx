import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Code, Download, Mail, Terminal, Sparkles } from "lucide-react";
import TypingEffect from "./TypingEffect";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- Spring Physics for the Card ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".reveal", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center z-10">
        
        {/* Intro Badge */}
        <div className="reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Available for Hire</span>
        </div>

        <h1 className="reveal text-7xl md:text-9xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Vikas Sharma
        </h1>

        <div className="reveal mb-14 h-12 flex items-center justify-center">
          <TypingEffect 
            texts={[
              "Hi, I'm Vikas Sharma 👋",
              "Full-Stack & AI/ML Developer building scalable systems 🤖",
              "I help turn complex ideas into reliable software 💻",
              "I design, build, and ship production-ready products 🚀",
            ]} 
            className="text-2xl md:text-4xl font-mono text-primary/80" 
          />
        </div>

        {/* SPRING CARD */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="reveal relative max-w-3xl mx-auto mb-20 group"
        >
          <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <div className="text-[10px] font-mono text-muted-foreground/60 flex items-center gap-2 uppercase tracking-widest">
                <Terminal className="w-3 h-3" /> developer.ts
              </div>
            </div>

            <div className="p-8 md:p-12 text-left font-mono text-base md:text-lg leading-relaxed">
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">1</span><p><span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> <span className="text-white">=</span> <span className="text-yellow-400">{"{"}</span></p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">2</span><p className="ml-6"><span className="text-cyan-400">name</span><span className="text-white">:</span> <span className="text-green-400">"Vikas Sharma"</span>,</p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">3</span><p className="ml-6"><span className="text-cyan-400">role</span><span className="text-white">:</span> <span className="text-green-400">"Full-Stack & AI/ML Developer"</span>,</p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">4</span><p className="ml-6"><span className="text-cyan-400">focus</span><span className="text-white">:</span> <span className="text-green-400">"Scalable production systems"</span>,</p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">5</span><p className="ml-6"><span className="text-cyan-400">expertise</span><span className="text-white">:</span> <span className="text-yellow-400">[</span></p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">6</span><p className="ml-16"><span className="text-green-400">"Full-Stack"</span>, <span className="text-green-400">"AI/ML"</span>, <span className="text-green-400">"System Design"</span></p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">7</span><p className="ml-6"><span className="text-yellow-400">]</span></p></div>
              <div className="flex"><span className="text-muted-foreground/30 mr-6 select-none">8</span><p><span className="text-yellow-400">{"}"}</span><span className="text-white">;</span></p></div>
            </div>
          </div>
        </motion.div>

        {/* BUTTONS WITH LINKS RESTORED */}
        <div className="reveal flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-primary rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-3 text-primary-foreground font-bold text-lg">
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Let’s Build Something
            </span>
          </motion.button>

          <motion.a
            href="https://drive.google.com/file/d/1d4Ut6dolRGIH91-5thgNZhjSaB9umoB1/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="group flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md text-white font-bold text-lg"
          >
            <Download className="w-5 h-5 text-primary group-hover:animate-bounce" />
            View Resume
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;