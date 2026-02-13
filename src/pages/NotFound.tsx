import { useLocation, Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, ArrowLeft, Rocket } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  // 1. Parallax Mouse Tracker
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // Calculate distance from center
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };

  // Smooth springs for buttery movement
  const springConfig = { damping: 50, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background moves slower, Card moves slightly for depth
  const bgX = useTransform(smoothX, (v) => v / 15);
  const bgY = useTransform(smoothY, (v) => v / 15);
  const cardX = useTransform(smoothX, (v) => v / -12);
  const cardY = useTransform(smoothY, (v) => v / -12);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#05020a] overflow-hidden cursor-none z-10"
    >
      {/* BACKGROUND LAYER */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-10%] pointer-events-none">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        
        {/* Animated Stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* CONTENT CARD */}
      <motion.div
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-lg px-6"
      >
        <div className="card-glass border border-white/10 bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 text-center shadow-2xl overflow-hidden group">
          
          {/* Decorative Rocket Icon */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6 text-purple-500"
          >
            <Rocket size={48} />
          </motion.div>

          <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-500 mb-4 select-none">
            404
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Lost in the Void?
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              The coordinates <span className="text-purple-400 font-mono italic px-2 py-0.5 bg-purple-500/10 rounded">"{location.pathname}"</span> don't exist in this dimension.
            </p>
          </div>

          {/* BACK TO REALITY BUTTON */}
          <motion.div 
            className="mt-10"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-extrabold rounded-2xl overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <Home size={20} className="relative z-10 group-hover/btn:text-white transition-colors" />
              <span className="relative z-10 group-hover/btn:text-white transition-colors">Back to Reality</span>
              <ArrowLeft size={18} className="relative z-10 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all group-hover/btn:text-white" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Reflection Shadow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-purple-500/20 blur-[60px] rounded-full -z-10" />
      </motion.div>
    </div>
  );
};

export default NotFound;