# Skiline Recruitment Design Guidelines

## Design Approach
**Reference-Based with Accessibility Focus**: Drawing inspiration from Airbnb's warm, trustworthy aesthetic combined with LinkedIn's professional approachability, adapted for senior-friendly accessibility. The design celebrates dignity and experience through generous spacing, large typography, and emotionally resonant imagery.

## Color System (As Specified)
- **Soft Blue (#A8C7E0)**: Primary brand color for headers, CTAs, trust elements
- **Warm Beige (#F5E8C7)**: Backgrounds, section dividers, warmth accents
- **Olive Green (#A3B18A)**: Secondary actions, hover states, renewal moments
- **White (#FFFFFF)**: Main backgrounds, clarity, breathing room

**Application Strategy**:
- Soft Blue for primary buttons and navigation highlights
- Warm Beige for alternating section backgrounds
- Olive Green for secondary CTAs and success states
- White as primary background with colored section dividers

## Typography Hierarchy
**Fonts (As Specified)**:
- Headings: Merriweather (serif) - conveys wisdom and trust
- Body: Open Sans (sans-serif) - maximum readability

**Scale (Senior-Friendly)**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl (60-72px desktop)
- Section Headings: text-3xl md:text-4xl (36-48px)
- Subheadings: text-xl md:text-2xl (24-30px)
- Body Text: text-lg md:text-xl (18-20px) - critically larger than standard
- Button Text: text-lg (18px minimum)
- Minimum line-height: leading-relaxed (1.625)

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (generous spacing throughout)
- Section padding: py-16 md:py-24 lg:py-32
- Container: max-w-7xl mx-auto px-6 md:px-8
- Card spacing: gap-8 md:gap-12
- Element spacing: mb-6 to mb-12 for vertical rhythm

**Grid Strategy**:
- Hero: Single column, centered, max-w-4xl
- Opportunity Cards (Homepage): grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Forms: Single column, max-w-2xl for optimal completion

## Component Library

**Navigation**:
- Large, clear text links (text-lg)
- High contrast against background
- Sticky header with soft shadow
- Mobile: Full-screen overlay menu with large touch targets (minimum 48px)

**Buttons**:
- Primary (Soft Blue background): Large, rounded-lg, px-8 py-4, text-lg
- Secondary (Olive Green): Outlined version with hover fill
- Blur effect on image overlays: backdrop-blur-sm bg-white/90
- Minimum height: 56px for accessibility

**Cards (Opportunity Categories)**:
- Rounded-xl borders
- Soft shadow (shadow-lg)
- Padding: p-8
- Hover: Subtle lift (translate-y-1 transition)
- Icon at top, heading, 2-3 line description, CTA link

**Forms**:
- Extra large input fields: text-lg, py-4, px-6
- Clear labels above inputs (text-lg, mb-2)
- Radio buttons for category selection: Large with descriptive text
- Generous field spacing: space-y-6
- Success message: Warm beige background with olive green text

**Gallery**:
- Masonry-style grid with consistent gaps
- Lightbox overlay: Dark backdrop with large image display
- Captions below images in warm beige boxes
- Aspect-ratio consistent cards

## Page-Specific Designs

**Homepage**:
- Hero: Full-width warm beige background with centered content, large hero image of diverse professionals (warm, authentic photography)
- Tagline "Experience Never Retires" in Merriweather, text-6xl
- Primary CTA button immediately below tagline
- 3-line mission statement: max-w-3xl, text-xl, centered
- 4 opportunity cards section: white background, grid layout
- Footer: Soft blue background, multiple columns (About, Quick Links, Contact)

**About Us**:
- Story section with side-by-side image and text (2 columns desktop)
- Values section: 4 cards with icons, Olive Green accents
- Team photo optional with warm framing

**Opportunities**:
- List view with generous spacing
- Each category: Icon, heading, 4-5 line description, "Join Us" button
- Alternating background colors (white/warm beige) for visual separation

**Join Us (Form Page)**:
- Category selection: 4 large radio card options with descriptions
- Dynamic form fields appear based on selection
- Vertical progression, single column
- Confirmation message: Warm celebration with success icon

**Gallery**:
- 3-column grid (2 on tablet, 1 on mobile)
- Images: Team meetings, diverse professionals, warm office environments
- Lightbox with smooth transitions

**Contact**:
- 2-column layout: Form left, info + map right (stacks on mobile)
- Large form fields matching Join Us style
- Google Maps embed with warm border treatment

## Images
**Hero Image**: Large, warm photograph of diverse professionals (retired person, housewife, young professionals) in collaborative setting - conveys trust, experience, and inclusivity. Full-width, minimum 600px height on desktop.

**About Us**: Team photo showing intergenerational collaboration, authentic office environment.

**Opportunities**: Icon illustrations for each category (simple, warm style).

**Gallery**: 12-15 authentic photos showing real people, events, welcoming moments - prioritize diversity and warmth over corporate polish.

## Animations
Minimal, purposeful only:
- Subtle fade-in on scroll for sections (100-200ms)
- Button hover: Slight scale and shadow increase
- Card hover: Gentle lift effect
- Form submission: Success checkmark animation

**Critical Accessibility**:
- All text meets WCAG AAA contrast ratios
- Focus states: 3px olive green outline
- Skip navigation link
- Alt text for all images
- Form validation with clear error messages
- No auto-playing content