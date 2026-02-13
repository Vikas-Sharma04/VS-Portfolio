import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "../components/CustomCursor";
import Background3D from "../components/3D/Background3D";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import SkillsConstellation from "../components/SkillsConstellation";
import ProjectsShowcase from "../components/ProjectsShowcase";
import Contact from "../components/Contact";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    let lenis;

    const initScrollAndAnims = async () => {
      // 1. Initialize Lenis Smooth Scroll
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // 2. Sync GSAP with Lenis
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // 3. REVEAL ANIMATIONS LOGIC
      
      // Reveal for Section Headers (Title & Subtitle)
      const sectionHeaders = document.querySelectorAll(".reveal-header");
      sectionHeaders.forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      });

      // Stagger Reveal for Skills
      ScrollTrigger.batch("#skills .skill-badge", {
        start: "top 85%",
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)", overwrite: true }
          );
        },
      });

      // Stagger Reveal for Project Cards
      ScrollTrigger.batch("#projects .card-project", {
        start: "top 80%",
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 80, opacity: 0, rotationX: -10 },
            { y: 0, opacity: 1, rotationX: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", overwrite: true }
          );
        },
      });

      // Generic "Reveal Up" class for any other content
      const reveals = document.querySelectorAll(".reveal-up");
      reveals.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    };

    initScrollAndAnims();

    return () => {
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <CustomCursor />
      <Background3D />
      <Navbar />

      <main className="relative z-10">
        <section id="home"><Hero /></section>
        
        {/* Added reveal-up class to wrapper for About */}
        <section id="about" className="reveal-up"><About /></section>
        
        <section id="skills"><SkillsConstellation /></section>
        
        <section id="projects"><ProjectsShowcase /></section>
        
        <section id="contact" className="reveal-up"><Contact /></section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-12 bg-gradient-to-t from-background to-background/90">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6 reveal-up">
            <h3 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2">
              Vikas <span className="text-primary italic tracking-normal">Sharma</span>
            </h3>
            <p className="text-muted-foreground">Full-Stack & AI/ML Developer</p>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Vikas Sharma. Crafted with 💜 using
              React, Three.js & GSAP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;