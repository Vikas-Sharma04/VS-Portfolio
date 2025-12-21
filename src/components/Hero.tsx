import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Code, Download, Mail, ArrowDown } from "lucide-react";
import TypingEffect from "./TypingEffect";
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (nameRef.current && titleRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        nameRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      ).fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }
  }, []);

  const typingTexts = [
    "Hi, I'm Vikas Sharma 👋",
    "Full-Stack & AI Engineer building scalable systems 🤖",
    "I help turn complex ideas into reliable software 💻",
    "I design, build, and ship production-ready products 🚀",
  ];

  const scrollToNext = () => {
    const skillsSection = document.querySelector("#skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div
        ref={heroRef}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-rotate-slow opacity-75"></div>
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
              <Code className="w-12 h-12 text-primary animate-pulse-glow" />
            </div>
          </div>
        </motion.div>

        {/* Animated Name */}
        <motion.h1
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        >
          <motion.span
            className="inline-block text-hero"
            whileHover={{
              scale: 1.05,
              rotateY: 10,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            Vikas Sharma
          </motion.span>
        </motion.h1>

        {/* Typing Effect */}
        <motion.h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-mono text-muted-foreground mb-8 h-20"
          initial={{
            y: 50,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          <TypingEffect
            texts={typingTexts}
            className="text-primary font-bold"
            speed={80}
            deleteSpeed={40}
            pauseDuration={1500}
          />
        </motion.h2>

        {/* Code Block Style Description */}
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
          className="text-xl md:text-2xl font-mono text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          <div className="card-glass p-6 rounded-2xl text-left">
            <span className="text-secondary">const</span>{" "}
            <span className="text-accent">developer</span>{" "}
            <span className="text-muted-foreground">= {"{"}</span>
            <br />
            <span className="ml-4 text-primary">name:</span>{" "}
            <span className="text-yellow-400">"Vikas Sharma"</span>,
            <br />
            <span className="ml-4 text-primary">role:</span>{" "}
            <span className="text-yellow-400">
              "Full-Stack & AI Engineer"
            </span>
            ,
            <br />
            <span className="ml-4 text-primary">focus:</span>{" "}
            <span className="text-yellow-400">
              "Designing and building scalable, production-ready systems"
            </span>
            ,
            <br />
            <span className="ml-4 text-primary">expertise:</span>{" "}
            <span className="text-yellow-400">
              ["Full-Stack Development", "AI/ML Systems", "System Design"]
            </span>
            <br />
            <span className="text-muted-foreground">{"}"}</span>;
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          {/* Get In Touch Button */}
          <motion.button
            className="btn-hero cursor-hover group"
            whileHover={{ scale: 1.05, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => {
              const element = document.querySelector("#contact"); // Make sure your Contact section has id="contact"
              if (element) {
                const offset = 80; // adjust for navbar height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Let’s Build Something
            </span>
          </motion.button>

          {/* View Resume Button */}
          <motion.a
            href="https://drive.google.com/file/d/1d4Ut6dolRGIH91-5thgNZhjSaB9umoB1/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary cursor-hover group"
            whileHover={{ scale: 1.05, rotateX: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              View Resume
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2,
            duration: 1,
          }}
          className="cursor-hover group"
        ></motion.button>

        {/* Floating 3D elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full opacity-40"
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, -180, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-3 h-3 bg-accent rounded-full opacity-50"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
            rotateZ: [0, 360, 720],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Enhanced Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none"></div>
    </section>
  );
};
export default Hero;
