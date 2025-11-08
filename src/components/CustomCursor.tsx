import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NUM_TRAILS = 10;
const STAR_COLORS = [
  "#FF5F6D",
  "#FFC371",
  "#6A82FB",
  "#FC5C7D",
  "#00F260",
  "#0575E6",
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  offsetX: number;
  offsetY: number;
}

const CustomCursor = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse/touch tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMouse({ x: e.clientX, y: e.clientY });
        addStar(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile) {
        const touch = e.touches[0];
        setMouse({ x: touch.clientX, y: touch.clientY });
        addStar(touch.clientX, touch.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("button, a, .cursor-hover"));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  const addStar = (x: number, y: number) => {
    const newStar: Star = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 3 + 2,
      opacity: 1,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      offsetX: Math.random() * 20 - 10,
      offsetY: Math.random() * 20 - 10,
    };
    setStars((prev) => [...prev, newStar].slice(-NUM_TRAILS));
  };

  // Animate stars fading/moving
  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.offsetX * 0.05,
            y: s.y + s.offsetY * 0.05,
            opacity: s.opacity - 0.05,
          }))
          .filter((s) => s.opacity > 0)
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main Blue Cursor for Desktop */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 shadow-lg"
          style={{
            x: mouse.x - 16,
            y: mouse.y - 16,
            backgroundColor: "#1E90FF",
            boxShadow: "0 0 12px rgba(30,144,255,0.8)",
          }}
          animate={{
            scale: isHovering ? 1.8 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      {/* Star Trails */}
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="fixed rounded-full pointer-events-none"
            style={{
              width: star.size,
              height: star.size,
              x: star.x - star.size / 2,
              y: star.y - star.size / 2,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            }}
            animate={{
              x: star.x + star.offsetX,
              y: star.y + star.offsetY,
              opacity: 0,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Hover ring for desktop */}
      {!isMobile && isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-40 border-2"
          style={{
            x: mouse.x - 48,
            y: mouse.y - 48,
            borderColor: "#1E90FF",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Subtle Blue Circle Trail for Mobile */}
      {isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-50"
          style={{
            x: mouse.x - 6,
            y: mouse.y - 6,
            backgroundColor: "rgba(30,144,255,0.3)",
          }}
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </>
  );
};

export default CustomCursor;
