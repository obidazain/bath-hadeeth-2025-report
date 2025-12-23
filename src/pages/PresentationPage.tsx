import { useState, useEffect, useCallback } from 'react';
import { SlideContainer } from '../components/presentation/SlideContainer';
import { SlideNav } from '../components/presentation/SlideNav';

// Slides
import { IntroSlide } from '../slides/IntroSlide';
import { KeyNumbersSlide } from '../slides/KeyNumbersSlide';
import { ComparisonSlide } from '../slides/ComparisonSlide';
import { PlatformDistributionSlide } from '../slides/PlatformDistributionSlide';
import { MonthlyTrendSlide } from '../slides/MonthlyTrendSlide';
import { WatchTimeSlide } from '../slides/WatchTimeSlide';
import { ProgramsRankingSlide } from '../slides/ProgramsRankingSlide';
// HIDDEN: import { FollowersSlide } from '../slides/FollowersSlide';
import { PodcastSlide } from '../slides/PodcastSlide';
import { MasterDashboardSlide } from '../slides/MasterDashboardSlide';
// HIDDEN: import { ProductionSlide } from '../slides/ProductionSlide';
// HIDDEN: import { programSlides } from '../slides/ProgramDetailSlide';
import { ConclusionSlide } from '../slides/ConclusionSlide';

const slides = [
  { component: IntroSlide, title: 'المقدمة' },
  { component: KeyNumbersSlide, title: 'الأرقام الرئيسية' },
  { component: ComparisonSlide, title: 'مقارنة 2024 vs 2025' },
  { component: PlatformDistributionSlide, title: 'توزيع المنصات' },
  { component: MonthlyTrendSlide, title: 'النمو الشهري' },
  { component: WatchTimeSlide, title: 'مدة المشاهدة' },
  { component: ProgramsRankingSlide, title: 'ترتيب البرامج' },
  // HIDDEN: نمو المتابعين - مخفي مؤقتاً
  // { component: FollowersSlide, title: 'نمو المتابعين' },
  { component: PodcastSlide, title: 'المنصات الصوتية' },
  // Overview slides
  { component: MasterDashboardSlide, title: 'لوحة التحكم الرئيسية' },
  // HIDDEN: عمليات الإنتاج 2025 - مخفي مؤقتاً
  // { component: ProductionSlide, title: 'عمليات الإنتاج 2025' },
  // HIDDEN: صفحات البرامج التفصيلية (12-25) - مخفية مؤقتاً
  // ...programSlides.map(p => ({ component: p.component, title: p.name })),
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
      />
    </div>
  );
}
