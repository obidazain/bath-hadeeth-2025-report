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
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin"
        style={{ maxHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
