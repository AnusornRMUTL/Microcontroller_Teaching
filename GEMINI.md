# 🎓 Microcontroller Interactive Web Page Standards (Arduino/ESP32 Pattern)

This document outlines the design patterns, coding standards, and architectural skills required to build interactive educational web pages for the **Microcontroller** course in this workspace. The course focuses on using the **Arduino IDE** and hardware boards including **Arduino Uno, Arduino MEGA, and ESP32 Devkit V1**. When asked to create or modify interactive microcontroller educational pages, strictly adhere to these principles.

## 📖 Lesson Structure & Flow
Every educational module must follow this structured flow (either as separate pages or navigable sections within a Single Page Application):
1. **Introduction (หน้าแรก - ทฤษฎีและความสำคัญ)**: The first section must explain the theoretical content, microcontroller concepts, hardware pinouts, and the importance or real-world application of the lesson before the student interacts with the simulator.
2. **Interactive Simulators & Code (เนื้อหาหลัก - วงจรจำลองและโค้ด)**: The core interactive tools where users can view schematic wiring on a breadboard, interact with input components (sensors, buttons), and see a mock "Arduino IDE" code snippet that drives the logic.
3. **End-of-Lesson Quiz (หน้าสุดท้าย - แบบทดสอบท้ายบท)**: The final section must contain a 10-question multiple-choice quiz to test comprehension.
   - **Submission & Grading**: When the user clicks submit, immediately evaluate the quiz and display the results (highlighting correct and incorrect answers with visual feedback).
   - **Retry Mechanism**: If the score is not perfect (less than 10/10), a "Retry" (กลับไปทำแบบทดสอบใหม่) button must be displayed to allow the user to reset the quiz state and try again.

## 🛠️ Architecture & Tech Stack
- **Frameworks**: Pure Vanilla HTML5, CSS3, and JavaScript. **Do NOT use React, Vue, Angular, or TailwindCSS** unless explicitly requested.
- **Data-Driven Logic**: Use centralized JavaScript configuration objects to store content, SVG templates (boards, components), logic functions, and **quiz questions/answers** (e.g., an array of question objects).

## 🎨 UI/UX & Design System (CSS)
- **Typography**: Use Google Fonts `'Sarabun', sans-serif` for excellent Thai language readability. Include a monospace font (like `'Fira Code'` or `'Courier New'`) for the Arduino IDE code blocks.
- **Theming**: Define and use CSS Variables (`:root`) for consistent color management.
  - *Primary*: Arduino Teal (`#00979C`), ESP32 Dark (`#e7352b` or `#231f20`).
  - *State Colors*: Active/HIGH (`#4ade80`), Inactive/LOW (`#475569`), PWM/Analog (`#facc15`).
  - *Quiz States*: Correct (`#22c55e`), Incorrect (`#ef4444`).
  - *Surfaces*: Cards (`#ffffff`), App Background (`#f8fafc`), Sidebar (`#1e293b`), Code Editor Dark (`#1e1e1e`).
- **Code Presentation (IDE Style)**: All program code snippets must be formatted to visually resemble a real IDE (e.g., Arduino IDE dark mode). Implement syntax highlighting using CSS classes (for keywords, strings, comments, numbers) to make the code easy to read and intuitive.
- **Layouts**: 
  - Use `display: flex` for the main application shell (Sidebar + Main Content).
  - Use `display: grid` for structured informational cards and side-by-side layout (Circuit view vs. Code Editor view).
- **Component Cards**: Wrap content in `.card` classes featuring soft box-shadows and rounded corners (`border-radius: 12px`).
- **Responsiveness**: The web page must be fully responsive. Implement `@media` queries to adapt layouts seamlessly across all device sizes (mobile, tablet, desktop). Stack sidebars, circuit simulators, and code blocks vertically on smaller screens (e.g., max-width: 768px).

## ⚡ Interactive Simulator Canvas
- **Environment**: Create a dedicated `.simulator-canvas` area with a dark background (`#0f172a`) and a CSS radial-gradient grid to mimic an engineering workspace or workbench.
- **Microcontroller Focus**: Visual representations must include accurate pinouts for **Arduino Uno, Arduino MEGA, or ESP32 Devkit V1**. 
- **Fixed Aspect Ratios**: Use `aspect-ratio` constraints (e.g., `16 / 9` or `2 / 1`) paired with absolute positioning for HTML overlay buttons ensuring they scale perfectly with the canvas.
- **Controls & IO**: Input buttons/sliders should mimic physical sensors (push buttons, potentiometers). Outputs should mimic LEDs, motors, or a Serial Monitor.

## ✨ Animation & SVG Manipulation
- **Engaging Learning Animations**: Insert animations where necessary to make learning more interesting and intuitive (e.g., micro-interactions, pulsing highlights on active components, or smooth revealing of code/results), without being overly distracting.
- **Inline SVG Graphics**: Use `<svg>` directly in the HTML or injected via JS strings for all diagrams, microcontrollers, and breadboard circuits. Avoid raster images (PNG/JPG).
- **Smooth Transitions**: Apply CSS `transition` (e.g., `transition: stroke 0.3s ease, fill 0.3s ease;`) to elements like wires, LEDs, and sensor dials.
- **State Visualization**: Use JavaScript to dynamically update SVG attributes based on interactive state (e.g., LED glowing `<filter>`, wire color changing when HIGH/LOW, or Serial Monitor text updating).

## 📜 JavaScript Structure Guidelines
1. **Initialization**: Map event listeners to buttons and simulated sensors upon `DOMContentLoaded`.
2. **State Management**: Keep track of user inputs, mock GPIO states (HIGH/LOW/PWM), variables in the mock Arduino code, and the quiz state.
3. **Dynamic Re-rendering**: When an input changes, trigger an `updateSimulation()` function to recalculate logic (mimicking the Arduino `loop()`), update UI/SVG wires, LEDs, and Serial Monitor outputs.
4. **Content Injection**: Inject SVG paths (boards, components), code snippets, and quiz HTML dynamically using JavaScript to keep the HTML shell clean and reusable.
