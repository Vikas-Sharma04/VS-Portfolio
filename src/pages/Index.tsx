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
    // Enhanced smooth scroll setup with Lenis
    const initSmoothScroll = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Connect Lenis with GSAP ScrollTrigger for enhanced animations
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Enhanced scroll-triggered animations
      ScrollTrigger.create({
        trigger: "#skills",
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.fromTo(
            "#skills .skill-badge",
            {
              y: 50,
              opacity: 0,
              scale: 0.8,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
            }
          );
        },
      });
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.fromTo(
            "#projects .card-project",
            {
              y: 100,
              opacity: 0,
              rotationY: 45,
            },
            {
              y: 0,
              opacity: 1,
              rotationY: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
            }
          );
        },
      });
    };
    initSmoothScroll();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div className="relative">
      <CustomCursor />
      <Background3D />
      <Navbar />

      <main className="relative z-10">
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <SkillsConstellation />
        </div>
        <div id="projects">
          <ProjectsShowcase />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-border/50 py-12 bg-gradient-to-t from-background to-background/90">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Vikas Sharma
              </h3>
              <p className="text-muted-foreground">
                Full-Stack Developer & Digital Creator
              </p>
            </div>

            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Vikas Sharma. Crafted with 💜 using
              React, Three.js & GSAP
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
