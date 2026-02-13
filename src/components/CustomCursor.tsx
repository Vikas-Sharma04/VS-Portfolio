import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const STAR_COLORS = ["#818cf8", "#c084fc", "#fb7185", "#22d3ee"];

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // High-performance motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs with "Magnetic" feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = !!target.closest("button, a, .cursor-hover, .card-project, input");
      setIsHovering(isSelectable);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. The Magnetic Aura (Follower) */}
      <motion.div
        className="absolute top-0 left-0 rounded-full blur-[20px] opacity-30"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 120 : 60,
          height: isHovering ? 120 : 60,
          background: `radial-gradient(circle, ${STAR_COLORS[0]}, ${STAR_COLORS[1]})`,
        }}
        transition={{ type: "spring", bounce: 0.3 }}
      />

      {/* 2. The Main Fluid Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: isClicking ? 90 : 0,
        }}
        className="absolute top-0 left-0 w-10 h-10 border border-white/40 rounded-full flex items-center justify-center"
      >
        {/* Inner core that glows on hover */}
        <motion.div 
          animate={{
            scale: isHovering ? 0.5 : 0,
            opacity: isHovering ? 1 : 0
          }}
          className="w-full h-full bg-white rounded-full blur-[2px]"
        />
      </motion.div>

      {/* 3. The "Ghost" Dot (Zero Latency) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full mix-blend-difference"
      />

      {/* 4. Click Ripple Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute top-0 left-0 w-10 h-10 border border-primary rounded-full"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;