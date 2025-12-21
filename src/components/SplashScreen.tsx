import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Galaxy from "../components/3D/Galaxy";
import TypingEffect from "../components/TypingEffect";

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const splashDuration = 3000; // total splash duration
    const timer = setTimeout(() => {
      // trigger fade-out
      setShow(false);

      // call onFinish after fade-out completes
      setTimeout(() => {
        onFinish?.();
      }, 1000); // match exit animation duration
    }, splashDuration);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center text-white text-2xl font-mono z-50"
          style={{ backgroundColor: "hsl(220, 25%, 8%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Galaxy Background with white stars only */}
          <div className="absolute inset-0 -z-10 w-full h-full">
            <Galaxy
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1.2}
              glowIntensity={0.3}
              saturation={0} // white stars only
              hueShift={0}
            />
          </div>

          {/* Logo visible immediately */}
          <motion.img
            src="/logo.png"
            alt="Logo"
            className="mb-6 w-48 h-48"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Typing Effect */}
          <TypingEffect
            texts={[
              "Welcome to the VS-Verse — Code. Create. Innovate. 🚀",
            ]}
            speed={50}
            deleteSpeed={45}
            pauseDuration={300}
            className="text-white text-4xl text-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
