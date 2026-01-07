import { useState, useEffect, useCallback } from 'react';
import { SlideContainer } from '../components/presentation/SlideContainer';
import { SlideNav } from '../components/presentation/SlideNav';

// Slides - Opening & Closing
import { BismillahSlide } from '../slides/BismillahSlide';
import { AlhamdulillahSlide } from '../slides/AlhamdulillahSlide';

// Slides - Bath Hadeeth
import { IntroSlide } from '../slides/IntroSlide';
import { ComparisonSlide } from '../slides/ComparisonSlide';
import { ProgramsRankingSlide } from '../slides/ProgramsRankingSlide';
import { PodcastSlide } from '../slides/PodcastSlide';
import { MasterDashboardSlide } from '../slides/MasterDashboardSlide';
import { ProgramsSystemSlide } from '../slides/ProgramsSystemSlide';
import { ContentStrategySlide } from '../slides/ContentStrategySlide';
import { AutomationSlide } from '../slides/AutomationSlide';
import { CompetitiveAnalysisSlide } from '../slides/CompetitiveAnalysisSlide';

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
// import { IntegralTimelineSlide } from '../slides/integral/IntegralTimelineSlide';
// import { IntegralTeamSlide } from '../slides/integral/IntegralTeamSlide';
import { IntegralVision2028Slide } from '../slides/integral/IntegralVision2028Slide';
import { IntegralThanksSlide } from '../slides/integral/IntegralThanksSlide';

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
  // Opening
  { component: BismillahSlide, title: 'بسم الله الرحمن الرحيم' },

  // Integral Media Slides
  { component: IntegralIntroSlide, title: 'Integral Media' },
  { component: IntegralAboutSlide, title: 'ماهي انتجرال ميديا' },

  // المضامين والرسالة
  { component: IntegralValuesIntroSlide, title: 'المضامين والرسالة', needsNavigate: true },
  { component: IntegralQuranSlide, title: 'القرآن الكريم', needsNavigate: true },
  { component: IntegralUmmaSlide, title: 'وحدة الأمة', needsNavigate: true },
  { component: IntegralSocietySlide, title: 'المجتمع', needsNavigate: true },
  { component: IntegralTrustSlide, title: 'الإنسان مؤتمن', needsNavigate: true },
  { component: IntegralTyrannySlide, title: 'الاستبداد', needsNavigate: true },
  { component: IntegralPalestineSlide, title: 'تحرير فلسطين', needsNavigate: true },
  { component: IntegralFaithSlide, title: 'التدين فطرة', needsNavigate: true },
  { component: IntegralFamilySlide, title: 'الأسرة', needsNavigate: true },
  { component: IntegralWomanSlide, title: 'المرأة الركيزة', needsNavigate: true },
  { component: IntegralEconomySlide, title: 'الاقتصاد', needsNavigate: true },

  // ثقافة العمل التوجيهية
  { component: IntegralCultureIntroSlide, title: 'ثقافة العمل التوجيهية', needsNavigate: true },
  { component: IntegralNamingSlide, title: 'التسمية', needsNavigate: true },
  { component: IntegralInnovationSlide, title: 'الابتكارية', needsNavigate: true },
  { component: IntegralCommunicationSlide, title: 'التواصل', needsNavigate: true },
  { component: IntegralCriticalSlide, title: 'النقدية', needsNavigate: true },
  { component: IntegralDecentralSlide, title: 'اللامركزية', needsNavigate: true },
  { component: IntegralAdaptSlide, title: 'التكيف', needsNavigate: true },
  { component: IntegralDocumentSlide, title: 'التوثيق', needsNavigate: true },
  { component: IntegralDataSlide, title: 'قراءة البيانات', needsNavigate: true },

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
  { component: ArabyPostSocialGrowthSlide, title: 'نمو السوشيال' },
  { component: ArabyPostEngagementSlide, title: 'التفاعل' },
  { component: ArabyPostWebsiteStatsSlide, title: 'زيارات الموقع' },
  { component: ArabyPostTransformSummarySlide, title: 'ملخص التحول' },
  { component: ArabyPostInvestigationsSlide, title: 'تحقيقات مفتوحة المصدر' },
  { component: ArabyPostExclusiveNewsSlide, title: 'أخبار حصرية' },

  // Bath Hadeeth Slides
  { component: IntroSlide, title: 'بث حديث' },
  { component: ComparisonSlide, title: 'مقارنة 2024 vs 2025' },
  { component: CompetitiveAnalysisSlide, title: 'المشهد التنافسي' },
  { component: ProgramsSystemSlide, title: 'منظومة البرامج' },
  { component: ContentStrategySlide, title: 'استراتيجية المحتوى' },
  { component: ProgramsRankingSlide, title: 'ترتيب البرامج' },
  { component: PodcastSlide, title: 'المنصات الصوتية' },
  { component: MasterDashboardSlide, title: 'لوحة التحكم الرئيسية' },
  { component: AutomationSlide, title: 'الأتمتة والذكاء الاصطناعي' },

  // Timeline & Vision Slides
  // { component: IntegralTimelineSlide, title: 'الخط الزمني والمؤشرات' },
  // { component: IntegralTeamSlide, title: 'فريق العمل' },
  { component: IntegralVision2028Slide, title: 'رؤية 2026-2028' },
  { component: IntegralThanksSlide, title: 'شكراً لكم' },

  // Closing
  { component: AlhamdulillahSlide, title: 'الحمد لله رب العالمين' },
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

  const currentSlideData = slides[currentSlide];
  const CurrentSlideComponent = currentSlideData.component;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <SlideContainer slideKey={currentSlide}>
        {currentSlideData.needsNavigate ? (
          <CurrentSlideComponent onNavigate={setCurrentSlide} />
        ) : (
          <CurrentSlideComponent />
        )}
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
