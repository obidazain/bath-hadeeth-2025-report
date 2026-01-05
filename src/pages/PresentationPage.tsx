import { useState, useEffect, useCallback } from 'react';
import { SlideContainer } from '../components/presentation/SlideContainer';
import { SlideNav } from '../components/presentation/SlideNav';

// Slides - Bath Hadeeth
import { IntroSlide } from '../slides/IntroSlide';
import { ComparisonSlide } from '../slides/ComparisonSlide';
import { MonthlyTrendSlide } from '../slides/MonthlyTrendSlide';
import { ProgramsRankingSlide } from '../slides/ProgramsRankingSlide';
import { PodcastSlide } from '../slides/PodcastSlide';
import { MasterDashboardSlide } from '../slides/MasterDashboardSlide';
import { ConclusionSlide } from '../slides/ConclusionSlide';

// Slides - Integral Media
import { IntegralIntroSlide } from '../slides/integral/IntegralIntroSlide';
import { IntegralAboutSlide } from '../slides/integral/IntegralAboutSlide';
import { IntegralValuesIntroSlide } from '../slides/integral/IntegralValuesIntroSlide';
import { IntegralQuranSlide } from '../slides/integral/IntegralQuranSlide';
import { IntegralUmmaSlide } from '../slides/integral/IntegralUmmaSlide';
import { IntegralSocietySlide } from '../slides/integral/IntegralSocietySlide';
import { IntegralTrustSlide } from '../slides/integral/IntegralTrustSlide';
import { IntegralTyrannySlide } from '../slides/integral/IntegralTyrannySlide';
import { IntegralPalestineSlide } from '../slides/integral/IntegralPalestineSlide';
import { IntegralFaithSlide } from '../slides/integral/IntegralFaithSlide';
import { IntegralFamilySlide } from '../slides/integral/IntegralFamilySlide';
import { IntegralWomanSlide } from '../slides/integral/IntegralWomanSlide';
import { IntegralEconomySlide } from '../slides/integral/IntegralEconomySlide';
import { IntegralCultureIntroSlide } from '../slides/integral/IntegralCultureIntroSlide';
import { IntegralNamingSlide } from '../slides/integral/IntegralNamingSlide';
import { IntegralInnovationSlide } from '../slides/integral/IntegralInnovationSlide';
import { IntegralCommunicationSlide } from '../slides/integral/IntegralCommunicationSlide';
import { IntegralCriticalSlide } from '../slides/integral/IntegralCriticalSlide';
import { IntegralDecentralSlide } from '../slides/integral/IntegralDecentralSlide';
import { IntegralAdaptSlide } from '../slides/integral/IntegralAdaptSlide';
import { IntegralDocumentSlide } from '../slides/integral/IntegralDocumentSlide';
import { IntegralDataSlide } from '../slides/integral/IntegralDataSlide';

// Slides - Araby Post
import { ArabyPostIntroSlide } from '../slides/arabypost/ArabyPostIntroSlide';
import { ArabyPostStorySlide } from '../slides/arabypost/ArabyPostStorySlide';
import { ArabyPostChallengesSlide } from '../slides/arabypost/ArabyPostChallengesSlide';
import { ArabyPostCoronaSlide } from '../slides/arabypost/ArabyPostCoronaSlide';
import { ArabyPostTransformSlide } from '../slides/arabypost/ArabyPostTransformSlide';
import { ArabyPostWhyChangeSlide } from '../slides/arabypost/ArabyPostWhyChangeSlide';
import { ArabyPostReasonsSlide } from '../slides/arabypost/ArabyPostReasonsSlide';
import { ArabyPostNewDirectionSlide } from '../slides/arabypost/ArabyPostNewDirectionSlide';
import { ArabyPostPolicySlide } from '../slides/arabypost/ArabyPostPolicySlide';
import { ArabyPostWebsiteStatsSlide } from '../slides/arabypost/ArabyPostWebsiteStatsSlide';
import { ArabyPostSocialGrowthSlide } from '../slides/arabypost/ArabyPostSocialGrowthSlide';
import { ArabyPostEngagementSlide } from '../slides/arabypost/ArabyPostEngagementSlide';
import { ArabyPostTransformSummarySlide } from '../slides/arabypost/ArabyPostTransformSummarySlide';
import { ArabyPostInvestigationsSlide } from '../slides/arabypost/ArabyPostInvestigationsSlide';
import { ArabyPostExclusiveNewsSlide } from '../slides/arabypost/ArabyPostExclusiveNewsSlide';

const slides = [
  // Integral Media Slides
  { component: IntegralIntroSlide, title: 'Integral Media' },
  { component: IntegralAboutSlide, title: 'ماهي انتجرال ميديا' },

  // المضامين والرسالة
  { component: IntegralValuesIntroSlide, title: 'المضامين والرسالة' },
  { component: IntegralQuranSlide, title: 'القرآن الكريم' },
  { component: IntegralUmmaSlide, title: 'وحدة الأمة' },
  { component: IntegralSocietySlide, title: 'المجتمع' },
  { component: IntegralTrustSlide, title: 'الإنسان مؤتمن' },
  { component: IntegralTyrannySlide, title: 'الاستبداد' },
  { component: IntegralPalestineSlide, title: 'تحرير فلسطين' },
  { component: IntegralFaithSlide, title: 'التدين فطرة' },
  { component: IntegralFamilySlide, title: 'الأسرة' },
  { component: IntegralWomanSlide, title: 'المرأة الركيزة' },
  { component: IntegralEconomySlide, title: 'الاقتصاد' },

  // ثقافة العمل التوجيهية
  { component: IntegralCultureIntroSlide, title: 'ثقافة العمل التوجيهية' },
  { component: IntegralNamingSlide, title: 'التسمية' },
  { component: IntegralInnovationSlide, title: 'الابتكارية' },
  { component: IntegralCommunicationSlide, title: 'التواصل' },
  { component: IntegralCriticalSlide, title: 'النقدية' },
  { component: IntegralDecentralSlide, title: 'اللامركزية' },
  { component: IntegralAdaptSlide, title: 'التكيف' },
  { component: IntegralDocumentSlide, title: 'التوثيق' },
  { component: IntegralDataSlide, title: 'قراءة البيانات' },

  // Araby Post Slides
  { component: ArabyPostIntroSlide, title: 'عربي بوست' },
  { component: ArabyPostStorySlide, title: 'البداية' },
  { component: ArabyPostPolicySlide, title: 'سياسة التحرير' },
  { component: ArabyPostChallengesSlide, title: 'التحديات' },
  { component: ArabyPostCoronaSlide, title: 'قفزة كورونا' },
  { component: ArabyPostTransformSlide, title: 'التحول 2024' },
  { component: ArabyPostWhyChangeSlide, title: 'لماذا التغيير' },
  { component: ArabyPostReasonsSlide, title: 'أسباب التغيير' },
  { component: ArabyPostNewDirectionSlide, title: 'الاتجاه الجديد' },
  { component: ArabyPostWebsiteStatsSlide, title: 'زيارات الموقع' },
  { component: ArabyPostSocialGrowthSlide, title: 'نمو السوشيال' },
  { component: ArabyPostEngagementSlide, title: 'التفاعل' },
  { component: ArabyPostTransformSummarySlide, title: 'ملخص التحول' },
  { component: ArabyPostInvestigationsSlide, title: 'تحقيقات مفتوحة المصدر' },
  { component: ArabyPostExclusiveNewsSlide, title: 'أخبار حصرية' },

  // Bath Hadeeth Slides
  { component: IntroSlide, title: 'بث حديث' },
  { component: ComparisonSlide, title: 'مقارنة 2024 vs 2025' },
  { component: MonthlyTrendSlide, title: 'النمو الشهري' },
  { component: ProgramsRankingSlide, title: 'ترتيب البرامج' },
  { component: PodcastSlide, title: 'المنصات الصوتية' },
  { component: MasterDashboardSlide, title: 'لوحة التحكم الرئيسية' },
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
