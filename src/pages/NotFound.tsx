import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 text-foreground overflow-hidden cursor-auto"
      style={{
        background:
          "linear-gradient(135deg, hsl(270, 100%, 10%) 0%, hsl(280, 60%, 6%) 100%)", // Purple-black theme
        color: "hsl(0, 0%, 100%)",
      }}
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(150,60,255,0.2),transparent_70%)] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,0,255,0.15),transparent_70%)] blur-3xl"></div>

      {/* Floating Stars (subtle background animation) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-70"
            style={{
              width: Math.random() * 3 + 2,
              height: Math.random() * 3 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 p-10 rounded-2xl card-glass text-center max-w-md w-full border border-purple-500/30 shadow-[0_0_30px_rgba(155,80,255,0.4)] backdrop-blur-xl"
      >
        {/* Glowing 404 */}
        <h1
          className="text-7xl font-extrabold mb-4 drop-shadow-lg"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)", // purple → pink
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
          }}
        >
          404
        </h1>

        {/* Message */}
        <p className="text-2xl font-semibold mb-2">Oops! Page Not Found</p>

        <p className="text-muted-foreground mb-6 leading-relaxed text-gray-300">
          The page{" "}
          <span className="font-mono bg-black/30 px-2 py-1 rounded text-sm text-purple-300">
            {location.pathname}
          </span>{" "}
          doesn’t exist or may have been moved.
        </p>

        {/* Return Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)",
            }}
          >
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
