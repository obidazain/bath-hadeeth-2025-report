interface SlideNavProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideNav({ currentSlide, totalSlides, onPrev, onNext }: SlideNavProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 border border-notion-border shadow-sm">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          aria-label="السابق"
          className="w-8 h-8 rounded-full hover:bg-notion-secondary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-notion-text"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <div className="flex items-center gap-1 px-2 text-sm">
          <span className="font-medium text-notion-text">{currentSlide + 1}</span>
          <span className="text-notion-text-secondary">/</span>
          <span className="text-notion-text-secondary">{totalSlides}</span>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          aria-label="التالي"
          className="w-8 h-8 rounded-full hover:bg-notion-secondary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-notion-text"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
