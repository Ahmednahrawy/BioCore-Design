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
    heroKicker1: 'Aerospace & Robotics',
    heroKicker2: 'ISO 9001:2015 & AS9100D',
    heroKicker3: 'Precision Engineering',
    heroTitle: 'Turnkey mechanical engineering, precision CAD modeling & FEA simulation.',
    heroSubtitle: 'From high-vacuum semiconductor robotics to aerospace titanium flight structures: we design, simulate, and deliver high-precision electromechanical systems with micron tolerances and zero-defect reliability.',
    heroCtaQuote: 'Request Engineering Quote',
    heroCtaPortfolio: 'Explore Case Studies',
    chatSupport: 'Chat with Engineering Support'
  },
  DE: {
    navCapabilities: 'Leistungen',
    navPortfolio: 'Portfolio',
    navQuote: 'Kostenvoranschlag',
    navTestimonials: 'Referenzen',
    navInsights: 'Fachberichte',
    navContact: 'Kontakt',
    requestQuoteBtn: 'Angebot Anfordern',
    heroKicker1: 'Luft- und Raumfahrt & Robotik',
    heroKicker2: 'ISO 9001:2015 & AS9100D',
    heroKicker3: 'Präzisionsmechanik',
    heroTitle: 'Schlüsselfertiger Maschinenbau, Präzisions-CAD & FEA-Struktursimulation.',
    heroSubtitle: 'Von Hochvakuum-Halbleiterrobotern bis zu Titan-Flugstrukturen: Wir konstruieren, simulieren und fertigen hochpräzise elektromechanische Systeme mit Mikrometertoleranzen.',
    heroCtaQuote: 'Angebot Anfordern',
    heroCtaPortfolio: 'Projekte Entdecken',
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
    heroKicker1: 'الفضاء والروبوتات المتقدمة',
    heroKicker2: 'معايير ISO 9001 و AS9100D',
    heroKicker3: 'الهندسة فائقة الدقة',
    heroTitle: 'هندسة ميكانيكية متكاملة، ونمذجة CAD دقيقة ومحاكاة الإجهادات FEA.',
    heroSubtitle: 'من أنظمة الروبوتات الطبية وأشباه الموصلات إلى هياكل الطيران المصنوعة من التيتانيوم: نقوم بتصميم ومحاكاة وتسليم أنظمة كهروميكانيكية فائقة الدقة بمستويات ميكرونية.',
    heroCtaQuote: 'طلب عرض سعر هندسي',
    heroCtaPortfolio: 'استكشاف المشاريع',
    chatSupport: 'تحدث مع الدعم الفني'
  },
  FR: {
    navCapabilities: 'Compétences',
    navPortfolio: 'Portfolio',
    navQuote: 'Devis Technique',
    navTestimonials: 'Témoignages',
    navInsights: 'Articles Techniques',
    navContact: 'Contact',
    requestQuoteBtn: 'Demander un Devis',
    heroKicker1: 'Aérospatiale & Robotique',
    heroKicker2: 'ISO 9001:2015 & AS9100D',
    heroKicker3: 'Ingénierie de Précision',
    heroTitle: 'Ingénierie mécanique clé en main, modélisation CAO et simulation FEA.',
    heroSubtitle: 'De la robotique semi-conducteur sous ultra-vide aux structures aéronautiques en titane : nous concevons, simulons et livrons des systèmes électromécaniques de haute précision.',
    heroCtaQuote: 'Demander un Devis',
    heroCtaPortfolio: 'Découvrir nos Projets',
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
    heroKicker1: 'Havacılık & Robotik',
    heroKicker2: 'ISO 9001:2015 & AS9100D',
    heroKicker3: 'Hassas Mühendislik',
    heroTitle: 'Anahtar teslim mekanik mühendislik, hassas CAD modelleme ve FEA simülasyonu.',
    heroSubtitle: 'Yüksek vakumlu yarı iletken robotiğinden havacılık titanyum uçuş yapılarına: mikron toleranslı ve sıfır hata güvenilirliğine sahip elektromekanik sistemler tasarlıyor ve üretiyoruz.',
    heroCtaQuote: 'Mühendislik Teklifi Alın',
    heroCtaPortfolio: 'Portföyü İnceleyin',
    chatSupport: 'Mühendislik Desteği'
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
