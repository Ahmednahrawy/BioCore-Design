import React, { createContext, useContext, useEffect, useState } from 'react';

export type LanguageCode = 'EN' | 'DE' | 'AR' | 'FR' | 'TR';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'EN', label: 'English', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'DE', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'AR', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'FR', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'TR', label: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
];

export interface Translations {
  navCapabilities: string;
  navPortfolio: string;
  navQuote: string;
  navTestimonials: string;
  navInsights: string;
  navContact: string;
  requestQuoteBtn: string;
  heroKicker1: string;
  heroKicker2: string;
  heroKicker3: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaQuote: string;
  heroCtaPortfolio: string;
  chatSupport: string;
}

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  EN: {
    navCapabilities: 'Capabilities',
    navPortfolio: 'Portfolio',
    navQuote: 'Engineering Quote',
    navTestimonials: 'Testimonials',
    navInsights: 'Technical Insights',
    navContact: 'Contact',
    requestQuoteBtn: 'Request Quote',
    heroKicker1: 'Mechanical Engineering',
    heroKicker2: 'Finite Element Analysis',
    heroKicker3: 'DFM / DFA',
    heroTitle: 'Precision mechanical design for flight-critical mechanisms and robotic hardware.',
    heroSubtitle: 'We engineer mission-critical hardware from initial kinematics to production-ready drawings. Partnering with aerospace primes, robotics innovators, and medical device leaders to eliminate manufacturing risks before cutting metal.',
    heroCtaQuote: 'Request Custom Quote',
    heroCtaPortfolio: 'Explore Portfolio',
    chatSupport: 'Chat with Support'
  },
  DE: {
    navCapabilities: 'Leistungen',
    navPortfolio: 'Portfolio',
    navQuote: 'Kostenvoranschlag',
    navTestimonials: 'Referenzen',
    navInsights: 'Fachberichte',
    navContact: 'Kontakt',
    requestQuoteBtn: 'Angebot Anfordern',
    heroKicker1: 'Maschinenbau',
    heroKicker2: 'Finite-Elemente-Methode',
    heroKicker3: 'DFM / DFA Fertigung',
    heroTitle: 'Präzisionsmechanik für flugkritische Mechanismen und Robotik-Hardware.',
    heroSubtitle: 'Wir entwickeln missionskritische Hardware von der ersten Kinematik bis zur fertigungsgerechten Zeichnung. Partnerschaft mit führenden Unternehmen der Luftfahrt und Medizintechnik.',
    heroCtaQuote: 'Angebot Anfordern',
    heroCtaPortfolio: 'Portfolio Entdecken',
    chatSupport: 'Support Chat'
  },
  AR: {
    navCapabilities: 'القدرات الهندسية',
    navPortfolio: 'معرض المشاريع',
    navQuote: 'عرض سعر هندسي',
    navTestimonials: 'آراء العملاء',
    navInsights: 'رؤى تقنية',
    navContact: 'تواصل معنا',
    requestQuoteBtn: 'طلب عرض سعر',
    heroKicker1: 'الهندسة الميكانيكية',
    heroKicker2: 'تحليل العناصر المحدودة (FEA)',
    heroKicker3: 'التصميم للتصنيع (DFM)',
    heroTitle: 'تصميم ميكانيكي عالي الدقة للآليات الفضائية وأجهزة الروبوتات.',
    heroSubtitle: 'نبتكر أنظمة عتاد ميكانيكي متقدم من الكينماتيكا الأولية حتى المخططات الجاهزة للإنتاج. شركاء رواد الفضاء والأجهزة الطبية والروبوتات.',
    heroCtaQuote: 'طلب عرض سعر مخصص',
    heroCtaPortfolio: 'استكشاف المشاريع',
    chatSupport: 'تحدث مع الدعم'
  },
  FR: {
    navCapabilities: 'Compétences',
    navPortfolio: 'Portfolio',
    navQuote: 'Devis Technique',
    navTestimonials: 'Témoignages',
    navInsights: 'Articles Techniques',
    navContact: 'Contact',
    requestQuoteBtn: 'Demander un Devis',
    heroKicker1: 'Génie Mécanique',
    heroKicker2: 'Analyse par Éléments Finis',
    heroKicker3: 'DFM / DFA',
    heroTitle: 'Conception mécanique de précision pour mécanismes aéronautiques et robotiques.',
    heroSubtitle: 'Nous développons du matériel critique de mission, de la cinématique initiale aux plans de fabrication conformes. Partenaires de pointe pour éliminer les risques avant usinage.',
    heroCtaQuote: 'Demander un Devis',
    heroCtaPortfolio: 'Explorer le Portfolio',
    chatSupport: 'Discuter avec le Support'
  },
  TR: {
    navCapabilities: 'Kabiliyetler',
    navPortfolio: 'Portföy',
    navQuote: 'Mühendislik Teklifi',
    navTestimonials: 'Müşteri Yorumları',
    navInsights: 'Teknik Makaleler',
    navContact: 'İletişim',
    requestQuoteBtn: 'Teklif Alın',
    heroKicker1: 'Makine Mühendisliği',
    heroKicker2: 'Sonlu Elemanlar Analizi (FEA)',
    heroKicker3: 'İmalat İçin Tasarım (DFM)',
    heroTitle: 'Uçuş açısından kritik mekanizmalar ve robotik donanımlar için hassas mekanik tasarım.',
    heroSubtitle: 'İlk kinematikten üretime hazır teknik çizimlere kadar göreve kritik donanımlar tasarlıyoruz. Havacılık, robotik ve tıbbi cihaz liderleriyle metal kesmeden önce imalat risklerini ortadan kaldırıyoruz.',
    heroCtaQuote: 'Özel Teklif İsteyin',
    heroCtaPortfolio: 'Portföyü İnceleyin',
    chatSupport: 'Destek ile Sohbet Edin'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  currentOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'biocore_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored === 'EN' || stored === 'DE' || stored === 'AR' || stored === 'FR' || stored === 'TR') {
          return stored;
        }
      }
    } catch {}
    return 'EN';
  });

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {}
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language.toLowerCase());
    if (language === 'AR') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentOption }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
