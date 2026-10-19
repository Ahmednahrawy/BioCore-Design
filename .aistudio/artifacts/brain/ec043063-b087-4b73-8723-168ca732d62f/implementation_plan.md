# BioCore-Design AI Chat Drawer & Inbound Consultation Fly Button

A floating action button (FAB) that opens an interactive, slide-over right drawer for prospective clients and engineering teams to converse with the BioCore-Design Customer Support & Solutions AI, powered by the Gemini API (`gemini-3.8-flash`).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been confirmed based on your preferences:

- **Confirmed Persona**: Customer support agent answering general company inquiries, engineering discipline capabilities, manufacturing standards, and project intake questions.
- **Confirmed Quick Starters**: 3 prominent starter prompts pre-populated on the thread:
  1. *"Estimate project cost"* (guides user on sizing, rates, and lead time)
  2. *"Material selection advice"* (Titanium Ti-6Al-4V vs. 7075-T6 vs. CF-PEEK)
  3. *"DFM guidelines"* (ASME Y14.5 GD&T tolerancing and 5-axis CNC machining yields)
- **Confirmed UI Layout**: Slide-over drawer panel mounted on the right edge of the viewport with smooth backdrop overlay, full conversational thread, auto-scrolling message list, input box with loading indicators, and quick action chips.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a dedicated "Chat with BioCore" floating action button positioned in the bottom-right corner of the interface (visually distinct, styled with an engineering chat icon and presence indicator). Clicking it reveals an animated slide-over drawer from the right screen edge.
- **Target Audience / Persona**: Prospective clients, engineering leads, and hardware innovators seeking fast answers regarding capabilities, facilities (Silicon Valley & Munich), pricing estimations, NDA confidentiality, and manufacturing tolerances.
- **AI Core**: Utilizes `@google/genai` with `gemini-3.8-flash` configured with a comprehensive system prompt encapsulating BioCore-Design's full technical profile:
  - AS9100D, ISO 13485:2016, and ITAR compliance standards
  - 6 core disciplines (CAD, FEA, DFM, Prototyping, Medical Device, Mechatronics)
  - Typical quotation metrics ($165/hr senior rate, turnaround times)
  - Direct routing to formal quote estimator and human lead engineers

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Zero State (Fly Button)**:
   - A floating pill-styled action button sits anchored at `bottom-6 right-6 z-40`.
   - Features a message icon, "Chat with Support", and an active status dot.
2. **Drawer Open Transition**:
   - Clicking the button slides out a `400px` (desktop) or `100vw` (mobile) side drawer with backdrop blur.
   - Header shows company branding, active agent status, model indicator, and close button (`X` and `Esc` key support).
3. **Conversational Interaction**:
   - Welcome card introduces the BioCore Assistant with verified quick-starter query buttons.
   - Multi-turn conversation: User messages appear aligned right in neutral slate; Assistant responses appear left in high-contrast card styling with formatted bullet points, bold headers, and copy code blocks.
   - Real-time streaming or pending typing indicator with pulsing ellipsis.
4. **Action Routing**:
   - When users express interest in getting an official quote or speaking with human engineers, the assistant offers direct in-chat jump links to `#quote-estimator` or `#contact`.

### Visual Theme & Styling
- **Colors**: Conforms to the existing precision industrial dark/light theme (neutral-900 / white surfaces, neutral-800 borders, amber-500 accent touches).
- **Typography**: Plus Jakarta Sans for message prose; JetBrains Mono for technical specifications and numerical metrics.
- **Zero-Pill Restraint**: Metadata lines inside messages (e.g. timestamps, source references) use clean unboxed text with `·` separators.

---

## 3. Key Product Decisions & Trade-Offs

- **Model Selection (`gemini-3.8-flash`)**:
  - *Chosen*: `gemini-3.8-flash` via `@google/genai`.
  - *Rationale*: Provides sub-second response times, cost efficiency, and strong technical adherence for real-time customer support dialogue.
- **Slide-Over Drawer vs. Modal**:
  - *Chosen*: Right-hand slide-over drawer (380–420px width).
  - *Rationale*: Allows users to keep browsing portfolio case studies and services on the left while conversing with support on the right.
- **Graceful Offline / Fallback Handling**:
  - *Chosen*: Integrated fallback engine that answers common technical questions even if an API key is temporarily unavailable or in local preview, ensuring 100% uptime with zero UI dead ends.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                      Client App                        │
│                                                        │
│  ┌────────────────────────┐    ┌────────────────────┐  │
│  │   Floating Fly Button  │───▶│ Slide-Over Drawer  │  │
│  │   (Bottom-Right Fixed) │    │ (State: isOpen)    │  │
│  └────────────────────────┘    └─────────┬──────────┘  │
│                                          │             │
│                        ┌─────────────────▼──────────┐  │
│                        │    ChatConversationContext  │  │
│                        │    - messages: Message[]   │  │
│                        │    - isGenerating: boolean │  │
│                        │    - activeStarters        │  │
│                        └─────────┬──────────────────┘  │
└──────────────────────────────────┼─────────────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │    @google/genai SDK Client   │
                   │    Model: gemini-3.8-flash    │
                   │    System Instructions:        │
                   │    BioCore Technical Profile  │
                   └───────────────────────────────┘
```

### Component Hierarchy
- `src/components/ChatFlyButton.tsx`: Floating trigger button anchored at bottom-right.
- `src/components/ChatDrawer.tsx`: Slide-over panel containing header, scrollable thread, quick-starter chips, and message input.
- `src/services/geminiChat.ts`: Wrapper around `@google/genai` handling multi-turn conversation history, system instructions, and error fallbacks.

### Interactive State Transitions
- `openChat() / closeChat()`: Toggles drawer visibility with `Escape` keyboard dismissal and outer backdrop click dismiss.
- `sendMessage(text)`: Appends user message, triggers pending state, streams or fetches Gemini response, and appends assistant message to thread with timestamp.
- `selectStarterPrompt(prompt)`: Automatically dispatches one of the three approved starter queries.
