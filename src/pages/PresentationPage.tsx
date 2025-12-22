import { useState, useEffect, useCallback } from 'react';
import { SlideContainer } from '../components/presentation/SlideContainer';
import { SlideNav } from '../components/presentation/SlideNav';

// Slides
import { IntroSlide } from '../slides/IntroSlide';
import { KeyNumbersSlide } from '../slides/KeyNumbersSlide';
import { PlatformDistributionSlide } from '../slides/PlatformDistributionSlide';
import { MonthlyTrendSlide } from '../slides/MonthlyTrendSlide';
import { WatchTimeSlide } from '../slides/WatchTimeSlide';
import { ProgramsRankingSlide } from '../slides/ProgramsRankingSlide';
import { FollowersSlide } from '../slides/FollowersSlide';
import { PodcastSlide } from '../slides/PodcastSlide';
import { programSlides } from '../slides/ProgramDetailSlide';
import { ConclusionSlide } from '../slides/ConclusionSlide';

const slides = [
  { component: IntroSlide, title: 'المقدمة' },
  { component: KeyNumbersSlide, title: 'الأرقام الرئيسية' },
  { component: PlatformDistributionSlide, title: 'توزيع المنصات' },
  { component: MonthlyTrendSlide, title: 'النمو الشهري' },
  { component: WatchTimeSlide, title: 'مدة المشاهدة' },
  { component: ProgramsRankingSlide, title: 'ترتيب البرامج' },
  { component: FollowersSlide, title: 'نمو المتابعين' },
  { component: PodcastSlide, title: 'المنصات الصوتية' },
  // Program detail slides
  ...programSlides.map(p => ({ component: p.component, title: p.name })),
  { component: ConclusionSlide, title: 'الخاتمة' },
];

export function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goToPrev();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNext, goToPrev]);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <SlideContainer slideKey={currentSlide}>
        <CurrentSlideComponent />
      </SlideContainer>

      <SlideNav
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={goToPrev}
        onNext={goToNext}
        onGoTo={goToSlide}
      />

      {/* Slide Title Indicator */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-full px-4 py-2 border border-notion-border shadow-sm">
          <span className="text-sm text-notion-text-secondary">{slides[currentSlide].title}</span>
          <span className="text-xs text-notion-text-secondary mr-2">({currentSlide + 1}/{slides.length})</span>
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-xs text-notion-text-secondary">
        استخدم الأسهم أو السحب للتنقل
      </div>
    </div>
  );
}
