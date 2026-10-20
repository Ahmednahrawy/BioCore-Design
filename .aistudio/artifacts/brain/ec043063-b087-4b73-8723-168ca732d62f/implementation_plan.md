# Multi-Language Localization (English, Arabic RTL, Turkish) & Top-Bar Globe Selector

A comprehensive internationalization (i18n) system for BioCore-Design providing native support for English, Arabic (with full bidirectional RTL layout mirroring), and Turkish, controlled via a dedicated Globe icon dropdown menu in the top navigation bar.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and localization specifications have been confirmed based on your choices:

- **Confirmed Layout Behavior**: When Arabic (`ar`) is selected, the application dynamically toggles `dir="rtl"` on `document.documentElement`, activating bidirectional layout mirroring (navigation order, text alignment, margins/paddings, and form controls). For English (`en`) and Turkish (`tr`), `dir="ltr"` is maintained.
- **Confirmed Translation Scope**: Complete end-to-end translation covering the Navigation bar, Hero section, Core Capabilities breakdown, Portfolio Case Studies & Dossiers, Client Testimonials & Benchmarks, Custom Engineering Quote Estimator, Technical Insights, Direct Contact & Labs, and Footer.
- **Confirmed Selector UI**: A Globe icon button in the top navigation bar with an active language badge (`EN`, `AR`, `TR`) that opens an accessible dropdown menu showing native language names (`English`, `العربية`, `Türkçe`) and checkmarks.

---

## 1. Overview & Core Concept

- **What It Does**: Enables international clients and global engineering partners across North America, Europe, Turkey, and the Middle East to experience the entire BioCore-Design platform in their preferred language.
- **Languages Supported**:
  1. **English (`en`)**: LTR, international engineering standard.
  2. **Arabic (`ar`)**: RTL, full bidirectional mirroring with Arabic engineering terminology.
  3. **Turkish (`tr`)**: LTR, specialized Turkish mechanical design & manufacturing terms.
- **Persistence**: User language preference is stored in `localStorage` (`biocore_language_preference`) and remembered across browser sessions.

---

## 2. User Experience & Visual Design

### Top Bar Language Selector
- **Default State**: Positioned in the top navigation bar adjacent to the Dark Mode and Analytics triggers.
- **Visuals**: A Globe icon paired with a subtle language indicator (`EN`, `AR`, or `TR`).
- **Dropdown Menu**:
  - Unrolls on click with backdrop blur and border styling matching the industrial dark/light aesthetic.
  - Lists each language with its native typography:
    - English (`English` · EN)
    - العربية (`العربية` · AR — with Arabic script font rendering)
    - Türkçe (`Türkçe` · TR)
  - Active language marked with a checkmark and amber highlight.
  - Keyboard accessible: `Escape` dismisses the menu, and clicking outside automatically closes it.

### RTL (Right-to-Left) Transformation for Arabic
- Automatically applies `dir="rtl"` to `<html>`.
- Grid alignments, flex orders, and icons mirror naturally (e.g. arrow directional cues flip appropriately).
- Numeric values and units (e.g. `±0.002 mm`, `AS9100D`, `$165/hr`) maintain proper bidirectional isolation via `font-mono` and `dir="ltr"` inline wrapping where appropriate so technical numbers never reverse.

---

## 3. Key Product Decisions & Trade-Offs

- **Dedicated Lightweight Translation Engine vs. Heavy External Library**:
  - *Chosen*: Custom TypeScript-typed dictionary system (`src/i18n/translations.ts` and `src/context/LanguageContext.tsx`).
  - *Why*: Zero bundle bloat, 100% type safety, zero asynchronous translation flicker, and instantaneous language switching without reloading the page.
- **Bidirectional Dynamic RTL vs. Separate Stylesheets**:
  - *Chosen*: Native HTML `dir="rtl"` attribute with Tailwind CSS logical properties (e.g., `start`, `end`, flex reversing).
  - *Why*: Smooth immediate transition with zero layout reflow delays or extra CSS downloads.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                      Client App                        │
│                                                        │
│  ┌────────────────────────┐    ┌────────────────────┐  │
│  │     Navbar Top Bar     │───▶│  LanguageSelector  │  │
│  │     (Globe Icon)       │    │  (Dropdown Menu)   │  │
│  └────────────────────────┘    └─────────┬──────────┘  │
│                                          │             │
│                        ┌─────────────────▼──────────┐  │
│                        │      LanguageContext       │  │
│                        │      - language: en|ar|tr  │  │
│                        │      - setLanguage(lang)   │  │
│                        │      - t(key, fallback)    │  │
│                        │      - dir: 'ltr' | 'rtl'  │  │
│                        └─────────┬──────────────────┘  │
│                                  │                     │
│                        ┌─────────▼──────────────────┐  │
│                        │   i18n Translation Store   │  │
│                        │   (EN, AR, TR Dictionaries)│  │
│                        └────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Component & File Mapping
- `src/types/i18n.ts`: Typed translation keys and supported language definitions.
- `src/i18n/translations.ts`: Complete translation dictionary for English, Arabic, and Turkish across all modules.
- `src/context/LanguageContext.tsx`: React context managing current language, RTL DOM attribute toggling, and translation lookup helper `t()`.
- `src/components/LanguageSelector.tsx`: Dropdown selector component mounted in `Navbar.tsx`.
- Component updates: `Navbar`, `Hero`, `ServicesSection`, `PortfolioSection`, `QuoteEstimator`, `BlogSection`, `ContactSection`, and `Footer` wired to use `useLanguage()`.
