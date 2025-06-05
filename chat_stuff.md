# React Router Dom Action Plan
Below is a step-by-step plan (with code examples) to add:

1. **A “Home” dropdown** that smooth-scrolls to sections on the main page
2. **A “Portfolio” page** (with its own nav and subsections)
3. **A “Classroom Technology” page** (with its own nav and subsections)

We’ll use React Router for multi-page navigation, anchor links + `scroll-behavior: smooth` for in-page jumps, and simple Tailwind classes for dropdown styling.

---

## 1. Install React Router

If you haven’t already, add React Router:

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

We’ll wrap the app in a `<BrowserRouter>` and define three top-level “routes”:

* `/` → **HomePage** (the existing main page)
* `/portfolio` → **PortfolioPage**
* `/classroom` → **ClassroomTechPage**

Each of those pages can have its own sub-nav (dropdown).

---

## 2. Update `App.jsx` to use Router + Routes

Rename your current `App.jsx` to something like `MainApp.jsx`, and create a new `App.jsx` that only handles routing. For example:

```jsx
// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainPage from "./pages/MainPage";            // "Home"
import PortfolioPage from "./pages/PortfolioPage";  // "Portfolio"
import ClassroomTechPage from "./pages/ClassroomTechPage"; // "Classroom Technology"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/classroom" element={<ClassroomTechPage />} />
        {/* Redirect any unknown path back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Now each page component (`MainPage`, `PortfolioPage`, `ClassroomTechPage`) can render its own Navbar (with dropdowns) plus all the sections underneath.

---

## 3. Create `MainPage.jsx` (the “Home” route)

Move your “existing main app” into `src/pages/MainPage.jsx`. We’ll add `id` attributes to each section so the navbar can anchor-link to them smoothly.

```jsx
// src/pages/MainPage.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { MobileMenu } from "../components/MobileMenu";
import { Home } from "../components/sections/Home";
import { LeftTextSection } from "../components/sections/LeftTextSection";
import { RightTextSection } from "../components/sections/RightTextSection";
import { ImageCarousel } from "../components/sections/ImageCarousel";
import { Footer } from "../components/Footer";

import { textSections, imageGalleries } from "../data/content";

export default function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // On mount, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="pt-16"> {/* push content below fixed navbar */}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* ---- HERO SECTION (Home) ---- */}
        <section id="home">
          <Home />
        </section>

        {/* ---- About Me ("Who Am I?") ---- */}
        <section id="whoami">
          <LeftTextSection title={textSections.whoAmI.title}>
            {textSections.whoAmI.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </LeftTextSection>
        </section>

        {/* ---- Image carousel (first) ---- */}
        <section id="carousel1">
          <ImageCarousel images={imageGalleries[0]} />
        </section>

        {/* ---- My Classroom section ---- */}
        <section id="myclassroom">
          <RightTextSection title={textSections.myClassroom.title}>
            {textSections.myClassroom.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </RightTextSection>
        </section>

        {/* ---- Image carousel (second) ---- */}
        <section id="carousel2">
          <ImageCarousel images={imageGalleries[1]} />
        </section>

        {/* ---- Teaching Philosophy ---- */}
        <section id="teachingphilosophy">
          <LeftTextSection title={textSections.teachingPhilosophy.title}>
            {textSections.teachingPhilosophy.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </LeftTextSection>
        </section>

        {/* ---- Image carousel (third) ---- */}
        <section id="carousel3">
          <ImageCarousel
            images={[
              "/juliacameron.jpg",
              "/ryan-nobg.png",
              "/juliacameron.jpg",
            ]}
          />
        </section>

        <Footer />
      </div>
    </>
  );
}
```

> **Notes:**
>
> 1. Each `<section>` has an `id="..."` so that we can link to it.
> 2. We added `pt-16` on the wrapper `<div>` to offset the fixed navbar’s height (adjust if your navbar’s height changes).
> 3. You could omit the extra carousel `<section>`‐wrappers if you don’t need separate anchors for them.

---

## 4. Create `PortfolioPage.jsx`

In the `PortfolioPage`, we want a similar layout: a hero with a background image, a title “My Portfolio,” then subsections (“Portfolio,” “Community Engagement,” “Lesson Plans”), each with its own anchor ID. For now, “Portfolio” can just render a `LeftTextSection`. We’ll also reuse the same `Navbar` component but tell it to highlight “Portfolio” as the active menu.

```jsx
// src/pages/PortfolioPage.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { MobileMenu } from "../components/MobileMenu";
import { LeftTextSection } from "../components/sections/LeftTextSection";
import { RightTextSection } from "../components/sections/RightTextSection";
import { ImageCarousel } from "../components/sections/ImageCarousel";
import { Footer } from "../components/Footer";

import { portfolioContent } from "../data/portfolioContent";
// (we’ll define portfolioContent in a moment)

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="pt-16">
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* ---- HERO with "computer-keyboard.jpg" background ---- */}
        <section
          id="portfolio-hero"
          className="relative h-[400px] flex items-center justify-center"
          style={{
            backgroundImage: "url(/computer-keyboard.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* White overlay (semi-transparent) */}
          <div className="absolute inset-0 bg-white/80"></div>
          <h1 className="relative text-4xl md:text-5xl font-bold text-bluemunsell">
            My Portfolio
          </h1>
        </section>

        {/* ---- Portfolio (LeftTextSection) ---- */}
        <section id="portfolio">
          <LeftTextSection title="Portfolio">
            {/* Replace this with your actual “Portfolio” content */}
            <p>{portfolioContent.portfolioText}</p>
          </LeftTextSection>
        </section>

        {/* ---- Community Engagement (RightTextSection + Carousel) ---- */}
        <section id="community-engagement">
          <RightTextSection title="Community Engagement Strategies">
            <p>{portfolioContent.communityText}</p>
          </RightTextSection>

          {/* Carousel right after */}
          <ImageCarousel images={portfolioContent.communityCarousel} />
        </section>

        {/* ---- Lesson Plans (LeftTextSection) ---- */}
        <section id="lesson-plans">
          <LeftTextSection title="My Lesson Plans">
            <p>{portfolioContent.lessonPlansText}</p>
          </LeftTextSection>
        </section>

        <Footer />
      </div>
    </>
  );
}
```

Now define `portfolioContent` somewhere—e.g. in `src/data/portfolioContent.js`:

```js
// src/data/portfolioContent.js

export const portfolioContent = {
  portfolioText:
    "This is where you can list or describe your portfolio pieces. For now, it’s a placeholder LeftTextSection.",

  communityText:
    "Here are some strategies I’ve used to engage community partners, students, and families. Replace with real content.",

  // Give an array of images or image objects for the carousel
  communityCarousel: [
    "/community1.jpg",
    "/community2.jpg",
    { src: "/community3.jpg", description: "Engaging Students" },
  ],

  lessonPlansText:
    "Below are my lesson plan highlights. Replace with real text or even a list of PDF links, etc.",
};
```

> **Notes:**
>
> 1. We used `bg-white/80` to apply a semi-transparent overlay over the hero image.
> 2. We placed each sub-section in a `<section id="...">` so that the Portfolio nav can anchor-link to it.

---

## 5. Create `ClassroomTechPage.jsx`

This page follows the same pattern: a hero with `Sora.jpg` background, then four subsections. The text sections alternate left/right, each followed by a carousel.

```jsx
// src/pages/ClassroomTechPage.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { MobileMenu } from "../components/MobileMenu";
import { LeftTextSection } from "../components/sections/LeftTextSection";
import { RightTextSection } from "../components/sections/RightTextSection";
import { ImageCarousel } from "../components/sections/ImageCarousel";
import { Footer } from "../components/Footer";

import { classroomTechContent } from "../data/classroomTechContent";
// (we’ll define this next)

export default function ClassroomTechPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="pt-16">
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* ---- HERO with "Sora.jpg" background ---- */}
        <section
          id="classroom-hero"
          className="relative h-[400px] flex items-center justify-center"
          style={{
            backgroundImage: "url(/Sora.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/80"></div>
          <h1 className="relative text-4xl md:text-5xl font-bold text-bluemunsell">
            Classroom Technology
          </h1>
        </section>

        {/* ---- How I Use Technology (LeftText + Carousel) ---- */}
        <section id="how-i-use-technology">
          <LeftTextSection title="How I Use Technology">
            <p>{classroomTechContent.howUseText}</p>
          </LeftTextSection>
          <ImageCarousel images={classroomTechContent.howUseCarousel} />
        </section>

        {/* ---- Digital Citizenship (RightText + Carousel) ---- */}
        <section id="digital-citizenship">
          <RightTextSection title="Digital Citizenship">
            <p>{classroomTechContent.digitalCitationText}</p>
          </RightTextSection>
          <ImageCarousel images={classroomTechContent.digitalCitationCarousel} />
        </section>

        {/* ---- Student Technology Engagement (LeftText + Carousel) ---- */}
        <section id="student-tech-engagement">
          <LeftTextSection title="Student Technology Engagement">
            <p>{classroomTechContent.studentEngagementText}</p>
          </LeftTextSection>
          <ImageCarousel
            images={classroomTechContent.studentEngagementCarousel}
          />
        </section>

        {/* ---- Culturally Relevant Learning Strategies (RightText + Carousel) ---- */}
        <section id="culturally-relevant-learning">
          <RightTextSection title="Culturally Relevant Learning Strategies">
            <p>{classroomTechContent.culturallyRelevantText}</p>
          </RightTextSection>
          <ImageCarousel
            images={classroomTechContent.culturallyRelevantCarousel}
          />
        </section>

        <Footer />
      </div>
    </>
  );
}
```

And define `classroomTechContent` in `src/data/classroomTechContent.js`:

```js
// src/data/classroomTechContent.js

export const classroomTechContent = {
  howUseText:
    "Here’s how I integrate technology into every facet of my classroom. Replace with your real explanation.",

  howUseCarousel: [
    "/tech1.jpg",
    "/tech2.jpg",
    "/tech3.jpg",
  ],

  digitalCitationText:
    "My approach to teaching Digital Citizenship focuses on ethics, safety, and digital footprints.",

  digitalCitationCarousel: [
    "/citizen1.jpg",
    "/citizen2.jpg",
  ],

  studentEngagementText:
    "Using interactive tools (e.g. Kahoot, Flipgrid), I keep students engaged and accountable.",

  studentEngagementCarousel: [
    "/engagement1.jpg",
    "/engagement2.jpg",
  ],

  culturallyRelevantText:
    "Culturally relevant learning means connecting content to students’ lived experiences.",

  culturallyRelevantCarousel: [
    "/cultural1.jpg",
    "/cultural2.jpg",
  ],
};
```

> **Notes:**
> • Adjust any image filenames to match your actual `/public` or `/assets` folder.
> • Each `<section id="…">` matches a sub-nav link.

---

## 6. Update `Navbar.jsx` to include dropdowns

Finally, we need a navbar that:

* Shows top-level links: **Home**, **Portfolio**, **Classroom Technology**
* On hover (or click), reveals a submenu of anchor links:

  * **Home →** “About Me,” “My Classroom,” “Teaching Philosophy”
  * **Portfolio →** “Portfolio,” “Community Engagement,” “Lesson Plans”
  * **Classroom Technology →** “How I Use Technology,” “Digital Citizenship,” “Student Technology Engagement,” “Culturally Relevant Learning Strategies”

Below is a Tailwind-based dropdown that works on hover for desktop and on click for mobile. You can tweak the styling as needed.

```jsx
// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation(); // so we can highlight active section

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Determine if we’re on the “main” page ("/") or one of the sub-pages
  const isHomeRoute = location.pathname === "/";
  const isPortfolioRoute = location.pathname.startsWith("/portfolio");
  const isClassroomRoute = location.pathname.startsWith("/classroom");

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(var(--vanilla)/1)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center h-16 relative">
          {/* Hamburger icon for mobile */}
          <div
            className={`md:hidden absolute left-0 w-7 h-5 flex items-center justify-center cursor-pointer z-50 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {/* ─── HOME DROPDOWN ─── */}
            <li className="relative group">
              {/* top-level link: if we’re on “/”, clicking “Home” scrolls to top; otherwise, NavLink to “/” */}
              {isHomeRoute ? (
                <a href="#home" className="nav-link">
                  Home
                </a>
              ) : (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link " + (isActive ? "font-bold" : "")
                  }
                >
                  Home
                </NavLink>
              )}

              {/* Submenu: appears on hover */}
              <ul className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <li className="border-b last:border-none">
                  <a
                    href="/#whoami"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    About Me
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/#myclassroom"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Classroom
                  </a>
                </li>
                <li>
                  <a
                    href="/#teachingphilosophy"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Teaching Philosophy
                  </a>
                </li>
              </ul>
            </li>

            {/* ─── PORTFOLIO DROPDOWN ─── */}
            <li className="relative group">
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "font-bold" : "")
                }
              >
                Portfolio
              </NavLink>

              <ul className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <li className="border-b last:border-none">
                  <a
                    href="/portfolio#portfolio"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Portfolio
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/portfolio#community-engagement"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Community Engagement
                  </a>
                </li>
                <li>
                  <a
                    href="/portfolio#lesson-plans"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Lesson Plans
                  </a>
                </li>
              </ul>
            </li>

            {/* ─── CLASSROOM TECHNOLOGY DROPDOWN ─── */}
            <li className="relative group">
              <NavLink
                to="/classroom"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "font-bold" : "")
                }
              >
                Classroom Technology
              </NavLink>

              <ul className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#how-i-use-technology"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    How I Use Technology
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#digital-citizenship"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Digital Citizenship
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#student-tech-engagement"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Student Technology Engagement
                  </a>
                </li>
                <li>
                  <a
                    href="/classroom#culturally-relevant-learning"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Culturally Relevant Learning Strategies
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
```

> **How this works**:
>
> * Each top-level `<li>` has `className="relative group"` so that hovering over it (on desktop) shows its submenu.
> * We use `<NavLink to="/…">` so React Router can apply an “active” style (in this case, bold).
> * The submenu items use `href="/#sectionId"` or `href="/page#sectionId"` to scroll to the correct `<section id="…">`. Because `html { scroll-behavior: smooth; }`, the jump will be smooth.
> * On mobile (when the hamburger is open), you can style the same list to appear as a vertical menu and toggle visibility based on `menuOpen`.

---

## 7. Update `MobileMenu.jsx` for mobile dropdowns

If you already have a `MobileMenu` that simply renders a vertical list when `menuOpen` is true, extend it to include the same submenu structure—except tapping a top-level item should expand/collapse its submenu. Here’s a quick example:

```jsx
// src/components/MobileMenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function MobileMenu({ menuOpen, setMenuOpen }) {
  // Track which submenu is open (null, "home", "portfolio", or "classroom")
  const [openSubmenu, setOpenSubmenu] = useState(null);

  if (!menuOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 backdrop-blur-lg shadow-lg z-40">
      <ul className="flex flex-col">
        {/* HOME (toggle submenu) */}
        <li
          className="border-b px-4 py-3 flex justify-between items-center cursor-pointer"
          onClick={() =>
            setOpenSubmenu((prev) => (prev === "home" ? null : "home"))
          }
        >
          <span className="font-medium">Home</span>
          <span>{openSubmenu === "home" ? "▲" : "▼"}</span>
        </li>
        {openSubmenu === "home" && (
          <ul className="pl-6 bg-gray-50">
            <li>
              <a
                href="/#whoami"
                className="block px-4 py-2"
                onClick={() => setMenuOpen(false)}
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="/#myclassroom"
                className="block px-4 py-2"
                onClick={() => setMenuOpen(false)}
              >
                My Classroom
              </a>
            </li>
            <li>
              <a
                href="/#teachingphilosophy"
                className="block px-4 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Teaching Philosophy
              </a>
            </li>
          </ul>
        )}

        {/* PORTFOLIO (toggle submenu) */}
        <li
          className="border-b px-4 py-3 flex justify-between items-center cursor-pointer"
          onClick={() =>
            setOpenSubmenu((prev) => (prev === "portfolio" ? null : "portfolio"))
          }
        >
          <span className="font-medium">Portfolio</span>
          <span>{openSubmenu === "portfolio" ? "▲" : "▼"}</span>
        </li>
        {openSubmenu === "portfolio" && (
          <ul className="pl-6 bg-gray-50">
            <li>
              <Link to="/portfolio#portfolio" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/portfolio#community-engagement" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                Community Engagement
              </Link>
            </li>
            <li>
              <Link to="/portfolio#lesson-plans" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                Lesson Plans
              </Link>
            </li>
          </ul>
        )}

        {/* CLASSROOM TECHNOLOGY (toggle submenu) */}
        <li
          className="border-b px-4 py-3 flex justify-between items-center cursor-pointer"
          onClick={() =>
            setOpenSubmenu((prev) => (prev === "classroom" ? null : "classroom"))
          }
        >
          <span className="font-medium">Classroom Technology</span>
          <span>{openSubmenu === "classroom" ? "▲" : "▼"}</span>
        </li>
        {openSubmenu === "classroom" && (
          <ul className="pl-6 bg-gray-50">
            <li>
              <Link to="/classroom#how-i-use-technology" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                How I Use Technology
              </Link>
            </li>
            <li>
              <Link to="/classroom#digital-citizenship" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                Digital Citizenship
              </Link>
            </li>
            <li>
              <Link to="/classroom#student-tech-engagement" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                Student Technology Engagement
              </Link>
            </li>
            <li>
              <Link to="/classroom#culturally-relevant-learning" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
                Culturally Relevant Learning Strategies
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}
```

> **How this works:**
>
> * When `menuOpen` is `true`, we render a full-width vertical menu.
> * Tapping a top-level item toggles `openSubmenu` so that only its submenu is visible.
> * Clicking any submenu link calls `setMenuOpen(false)` to collapse the mobile menu.

---

## 8. Tailwind “smooth scroll” is already on

Because you have in your CSS:

```css
html {
  scroll-behavior: smooth;
}
```

All `<a href="#sectionId">` or `<a href="/page#sectionId">` will smoothly scroll to the element with `id="sectionId"`. No extra JS is needed.

---

## 9. Final folder structure

After these changes, your key files look like this:

```
/src
  /components
    Navbar.jsx
    MobileMenu.jsx
    /sections
      Home.jsx
      LeftTextSection.jsx
      RightTextSection.jsx
      ImageCarousel.jsx
      Footer.jsx
  /data
    content.js
    portfolioContent.js
    classroomTechContent.js
  /pages
    MainPage.jsx
    PortfolioPage.jsx
    ClassroomTechPage.jsx
  App.jsx      ← wraps Routes
  main.jsx     ← your ReactDOM.render/tooling (depending on your setup)
  index.css
  App.css
```

Make sure your images (`computer-keyboard.jpg`, `Sora.jpg`, etc.) live in `public/` (or wherever your build serves static assets). For example:

```
/public
  /computer-keyboard.jpg
  /Sora.jpg
  /juliacameron.jpg
  /ryan-nobg.png
  /community1.jpg
  /community2.jpg
  …
```

---

## 10. Recap of how it all flows

1. **User visits “/” (HomePage)**

   * Hero → About Me → Carousel → My Classroom → Carousel → Teaching Philosophy → Carousel → Footer
   * Navbar “Home” is bolded. Hover over “Home” reveals “About Me / My Classroom / Teaching Philosophy.” Clicking those smooth-scrolls to their `<section id="…">`.

2. **User clicks “Portfolio”**

   * React Router navigates to `/portfolio`.
   * Navbar “Portfolio” is bold. Hover reveals “Portfolio / Community Engagement / Lesson Plans.”
   * The hero displays `computer-keyboard.jpg` with “My Portfolio.”
   * Each submenu item scrolls to its own `<section id="…">` on that page.

3. **User clicks “Classroom Technology”**

   * React Router navigates to `/classroom`.
   * Navbar “Classroom Technology” is bold. Hover reveals the four sublinks.
   * Hero uses `Sora.jpg`, and each sublink smooth-scrolls to the correct section (left/right text + carousel).

4. **Mobile**

   * Tapping the hamburger toggles `menuOpen`.
   * Tapping the top-level “Home / Portfolio / Classroom Technology” toggles its submenu items.
   * Tapping a submenu link (e.g. “About Me”) will close the menu (`setMenuOpen(false)`) and either smooth-scroll (for Home) or navigate + scroll (for Portfolio/Classroom).

---

### A couple of small tips:

* If you want the active submenu item highlighted once you scroll down far enough, you can use a scroll listener + `useLocation` hook to set an “active” class based on `window.scrollY` vs. each section’s `offsetTop`. That’s a bit more advanced, but the basic anchor links will let the user jump directly.
* You can adjust all heights (hero `h-[400px]`) and spacing as needed.
* Feel free to add `aria-haspopup="true"` and other accessibility attributes to the dropdown toggles if you need to follow a full A11y pattern.

With these changes in place, your nav-subnav structure, smooth scrolling, and separate pages for Portfolio and Classroom Technology will all work as requested.
