# Interaction and motion direction

The generated sculpture was removed at Radhika's request. The design now expresses personality through typography and interaction. The served image asset, image preload, and sculpture caption have also been removed.

## Motion

- The two name lines enter through separate typographic masks. Each entrance finishes within 1.1 seconds.
- The hero explorer switches between Products, AI & ML, and Robotics. Each selection animates its large verb and displays a real project link. It never advances automatically.
- Project headings, previews, and selected sections reveal once when they enter the viewport. Already-visible content does not replay on hydration.
- Project previews tilt by up to three degrees with a mouse pointer. Hover and keyboard focus expose an Explore label.
- Navigation underlines and project titles respond to hover and keyboard focus.
- A thin reading-progress line follows native scrolling in browsers supporting CSS scroll timelines.

## Accessibility and performance

Hero tabs support left/right arrows, Home, End, and ordinary touch/click input. Each tab controls a labelled panel. Reduced-motion preferences disable entrance animations, scroll reveals, preview tilting, and the progress line. Changing this preference while the page is open cancels active animations and removes pointer listeners.

All substantive content is visible without animation support. Scroll reveals use IntersectionObserver and the Web Animations API without leaving sections hidden in CSS. Pointer updates are limited to one animation frame. Observers, listeners, animation frames, and active reveals are cleaned up on unmount. No animation packages, perpetual timers, custom cursors, or scroll interception were added.

## Validation

Production build and ESLint passed. Browser checks confirmed click and arrow-key selection, the Robotics project destination, live scroll reveals, pointer tilt, and zero running animations in reduced-motion mode. The homepage's automated axe scan reported zero violations, with contrast checks on animated text and SVG labels requiring manual review.
