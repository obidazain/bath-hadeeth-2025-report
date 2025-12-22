import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface SlideContainerProps {
  children: ReactNode;
  slideKey: string | number;
}

export function SlideContainer({ children, slideKey }: SlideContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
        }}
        className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin"
        style={{ maxHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
