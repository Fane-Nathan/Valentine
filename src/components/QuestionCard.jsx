import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const QuestionCard = ({ onYes }) => {
  const [noBtnState, setNoBtnState] = useState({ x: 0, y: 0, startX: 0, startY: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [neutralMessage, setNeutralMessage] = useState("");
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  const moveNoButton = () => {
    if (hoverCount >= 5) return;
    
    setHoverCount(prev => prev + 1);

    // Conservative dimensions for boundaries
    const padding = 48; // Space from screen edges
    const btnWidth = 180; 
    const btnHeight = 64; 

    // Calculate viewport bounds for the top-left of the button
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const safeMaxX = Math.max(padding, maxX);
    const safeMaxY = Math.max(padding, maxY);

    let newX = padding + Math.random() * (safeMaxX - padding);
    let newY = padding + Math.random() * (safeMaxY - padding);

    // Initial random jump if it's the first time
    if (noBtnState.position !== 'fixed' && noBtnRef.current) {
        const rect = noBtnRef.current.getBoundingClientRect();
        setNoBtnState({ 
            x: newX, 
            y: newY, 
            startX: rect.left,
            startY: rect.top,
            position: 'fixed' 
        });
    } else {
        setNoBtnState(prev => ({ 
            ...prev,
            x: newX, 
            y: newY 
        }));
    }
  };

  const handleNoClick = () => {
    if (hoverCount >= 5) {
      setNeutralMessage("Maybe next time then? That's okay! 😊");
      if (onYes) onYes('caught'); // Trigger notification for 'caught'
    } else {
      moveNoButton();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-valentine-pink/10 via-white to-valentine-blush/10 -z-20" />
      <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] bg-valentine-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-[-25%] right-[-15%] w-[60%] h-[60%] bg-valentine-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-25%] left-[20%] w-[60%] h-[60%] bg-valentine-blush rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <motion.div 
        ref={containerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel p-12 rounded-3xl text-center z-10 max-w-xl w-full mx-4 border border-white/60 relative"
      >
        <motion.div
           animate={{ y: [0, -10, 0] }}
           transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
           className="mb-8 flex justify-center"
        >
          <Heart className="w-24 h-24 text-valentine-red fill-valentine-pink/20 stroke-[1.5px]" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-elegant text-gray-800 mb-6 tracking-tight">
          Will you be my <span className="text-valentine-love italic">Valentine?</span>
        </h1>
        
        <p className="text-gray-500 font-body text-lg mb-10">
          {neutralMessage ? neutralMessage : "I've been waiting to ask you this..."}
        </p>
        
        <div className="flex justify-center gap-8 items-center h-24">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onYes('yes')}
            className="px-10 py-4 bg-gradient-to-r from-valentine-red to-valentine-love text-white font-medium rounded-full text-xl shadow-lg hover:shadow-xl transition-all ring-offset-2 focus:ring-2 ring-pink-300"
          >
            Yes, I'd love to! 💖
          </motion.button>

          {/* Inline placeholder or button */}
          {noBtnState.position !== 'fixed' && (
            <motion.button
                ref={noBtnRef}
                onMouseEnter={moveNoButton}
                onClick={handleNoClick}
                className="px-10 py-4 bg-white text-gray-400 font-medium rounded-full text-xl shadow-sm border border-gray-100 hover:text-gray-600 transition-colors"
            >
                No way 🙅‍♂️
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Runaway No Button (rendered at root to escape containing blocks) */}
      <AnimatePresence>
        {noBtnState.position === 'fixed' && (
            <motion.button
                key="runaway-no"
                initial={{ 
                    opacity: 0, 
                    scale: 0.5,
                    x: noBtnState.startX,
                    y: noBtnState.startY
                }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: noBtnState.x, 
                    y: noBtnState.y 
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                onMouseEnter={moveNoButton}
                onClick={handleNoClick}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 100
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20,
                    opacity: { duration: 0.4 }
                }}
                className="px-10 py-4 bg-white text-gray-400 font-medium rounded-full text-xl shadow-2xl border border-gray-100 hover:text-gray-600 transition-colors whitespace-nowrap"
            >
                {hoverCount >= 5 ? "Okay fine... 🥺" : "No way 🙅‍♂️"}
            </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;
