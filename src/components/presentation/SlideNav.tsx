import { motion } from 'framer-motion';

interface SlideNavProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export function SlideNav({ currentSlide, totalSlides, onPrev, onNext, onGoTo }: SlideNavProps) {
  // Show only a subset of indicators when there are many slides
  const maxVisibleDots = 10;
  const showDots = totalSlides <= maxVisibleDots;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 border border-notion-border shadow-lg">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="w-10 h-10 rounded-full bg-notion-secondary hover:bg-notion-hover disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all text-notion-text"
        >
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators or Counter */}
        {showDots ? (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => onGoTo(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-notion-border hover:bg-notion-text-secondary'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4">
            <span className="text-lg font-semibold text-primary">{currentSlide + 1}</span>
            <span className="text-notion-text-secondary">/</span>
            <span className="text-notion-text-secondary">{totalSlides}</span>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="w-10 h-10 rounded-full bg-notion-secondary hover:bg-notion-hover disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all text-notion-text"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
