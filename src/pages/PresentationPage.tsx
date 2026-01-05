import { useState, useEffect, useCallback } from 'react';
import { SlideContainer } from '../components/presentation/SlideContainer';
import { SlideNav } from '../components/presentation/SlideNav';

// Slides
import { IntroSlide } from '../slides/IntroSlide';
import { ComparisonSlide } from '../slides/ComparisonSlide';
import { MonthlyTrendSlide } from '../slides/MonthlyTrendSlide';
import { ProgramsRankingSlide } from '../slides/ProgramsRankingSlide';
import { PodcastSlide } from '../slides/PodcastSlide';
import { MasterDashboardSlide } from '../slides/MasterDashboardSlide';
import { ConclusionSlide } from '../slides/ConclusionSlide';

const slides = [
  { component: IntroSlide, title: 'المقدمة' },
  // { component: KeyNumbersSlide, title: 'الأرقام الرئيسية' }, // Hidden in this version
  { component: ComparisonSlide, title: 'مقارنة 2024 vs 2025' },
  // { component: PlatformDistributionSlide, title: 'توزيع المنصات' }, // Hidden in this version
  { component: MonthlyTrendSlide, title: 'النمو الشهري' },
  // { component: WatchTimeSlide, title: 'مدة المشاهدة' }, // Hidden in this version
  { component: ProgramsRankingSlide, title: 'ترتيب البرامج' },
  // { component: FollowersSlide, title: 'نمو المتابعين' }, // Hidden in this version
  { component: PodcastSlide, title: 'المنصات الصوتية' },
  { component: MasterDashboardSlide, title: 'لوحة التحكم الرئيسية' },
  // { component: ProductionSlide, title: 'عمليات الإنتاج 2025' }, // Hidden
  // ...programSlides.map(p => ({ component: p.component, title: p.name })), // Hidden - all program slides
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


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowRight':
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
      />
    </div>
  );
}
