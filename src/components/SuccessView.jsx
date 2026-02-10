import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessView = () => {
  // Trigger confetti on mount
  React.useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-[#fff5f8]">
      <div className="absolute inset-0 bg-gradient-to-br from-valentine-pink/60 via-[#fff8fa] to-valentine-blush/40 -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10 glass-panel p-8 sm:p-16 rounded-2xl sm:rounded-[3rem] mx-4"
      >
        <motion.div 
            animate={{ 
                scale: [1, 1.25, 1.1, 1.3, 1],
                filter: ["drop-shadow(0 0 0px rgba(230,57,70,0))", "drop-shadow(0 0 20px rgba(230,57,70,0.4))", "drop-shadow(0 0 0px rgba(230,57,70,0))"]
            }}
            transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                times: [0, 0.1, 0.2, 0.3, 1],
                ease: "easeInOut" 
            }}
            className="inline-block mb-8"
        >
            <div className="relative">
                <Heart className="w-20 h-20 sm:w-32 sm:h-32 text-valentine-red fill-valentine-red drop-shadow-2xl" />
                <Stars className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-yellow-400 w-8 h-8 sm:w-12 sm:h-12 animate-pulse" />
            </div>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-elegant text-gray-900 mb-4 sm:mb-6 tracking-tighter">
          You said <span className="text-valentine-love italic">Yes!</span>
        </h1>
        
        <motion.p 
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg sm:text-2xl md:text-3xl font-light font-body text-gray-600"
        >
          You just made me the happiest person alive. ❤️
        </motion.p>
      </motion.div>

      {/* Floating Hearts Background */}
      {[...Array(typeof window !== 'undefined' && window.innerWidth < 640 ? 20 : 40)].map((_, i) => {
        const size = Math.random() * 30 + 15;
        const colors = ['#ff4d6d', '#ffb8d1', '#e63946', '#ffc2d1', '#d8b4fe'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 40; // wider drift: -20% to +20%
        const startY = 100 + Math.random() * 20; // start between 100vh and 120vh
        
        return (
          <motion.div
              key={i}
              initial={{ 
                  opacity: 0, 
                  y: `${startY}vh`, 
                  x: `${startX}vw`,
                  rotate: Math.random() * 360,
                  scale: 0.5
              }}
              animate={{ 
                  opacity: [0, 0.9, 0.7, 0], 
                  y: "-10vh",
                  x: [`${startX}vw`, `${startX + drift * 0.5}vw`, `${startX + drift}vw`],
                  rotate: [0, 30, -30, 15],
                  scale: [0.5, 1, 0.8]
              }}
              transition={{ 
                  duration: Math.random() * 10 + 8, 
                  repeat: Infinity, 
                  delay: Math.random() * 15,
                  ease: "easeInOut"
              }}
              style={{ color, fontSize: `${size}px`, left: 0, top: 0 }}
              className="absolute pointer-events-none drop-shadow-sm select-none z-0"
          >
              ❤
          </motion.div>
        );
      })}
    </div>
  );
};

export default SuccessView;
