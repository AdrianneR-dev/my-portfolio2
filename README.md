Adrianne Rhodes - July 2026

Project Title: MyPortfolio

This application uses React JS + Vite to create a website. 

Live Link: https://my-portfolio2-nine-jet.vercel.app/

The purpose of this project is to display a digital portfolio of my previous work that was created while participating in the Mississippi Coding Academy. 

Future Improvements: In my opinion, the site could have a different layout for the projects page. Each project may have a thumbnail image of the site added as a preview before users click on it.

I will go further in depth about this portfolio project below:

This is a single-page developer portfolio built with React 19, Vite, React Router, and Tailwind CSS v4. It has four routed views (Home, Experience, Projects, Contact), a global light/dark theme system, and a live GitHub-repo feed on the Projects page.

Project structure
src/
  main.jsx                 # Entry point — mounts the app, wraps it in ThemeProvider
  App.jsx                  # Router + page layout shell (Navbar / Routes / Footer)
  index.css / App.css      # Global styles, Tailwind entry
  components/
    ThemeContext.jsx       # React Context provider for dark/light theme
    useTheme.js             # Hook that reads ThemeContext
    Navbar.jsx              # Top nav, route links, theme toggle button
    Footer.jsx               # Static footer links
  hooks/
    useFetch.jsx            # Generic data-fetching hook (GET + JSON)
  views/
    Home.jsx                 # Landing/hero section
    Experience.jsx            # Skills + filterable timeline (local state only)
    Projects.jsx               # GitHub repos fetched via useFetch + client-side search
    Contact.jsx                 # Controlled form with inline validation

Data-flow logic

The app has two independent data sources, and everything else is local component state — there is no global store (Redux/Zustand/etc.) and no prop-drilling of app-wide data beyond the theme.

1. Theme state (global, via Context)
main.jsx
  └─ <ThemeProvider>              (src/components/ThemeContext.jsx)
       └─ <App />
            ├─ <Navbar />         reads { isDark, toggleTheme } via useTheme()
            └─ <Home />           reads { isDark, toggleTheme } via useTheme()

ThemeProvider owns the single source of truth: isDark (useState).

toggleTheme() flips isDark; that's the only way theme state changes.

Any component that needs the theme calls the useTheme() hook (src/components/useTheme.js), which does useContext(ThemeContext) and throws if called outside the provider — this is a safety rail during development, not something that fires in production usage since the whole tree is always wrapped in ThemeProvider.

Consumers currently: Navbar (toggle button + icon) and Home (a secondary toggle button). No other view needs theme state directly — dark-mode styling elsewhere is handled purely via Tailwind's dark: variant classes reading the <html class="dark"> flag, not via the context.

2. Remote data (per-page, via a custom hook)
Projects.jsx
  └─ useFetch(githubApiUrl)       (src/hooks/useFetch.jsx)
       └─ { data, loading, error }
useFetch is a generic, reusable fetch wrapper: given a URL, it manages data / loading / error state and re-runs whenever the URL changes.

It guards against the classic "setState after unmount" race with an isMounted flag cleaned up in the effect's return function.

Projects.jsx is the only current consumer. It combines the fetched repos array with local search state (useState) to derive filteredRepos on every render — this filtering is pure and derived, not stored separately, so there's nothing to keep in sync.

3. Purely local state
Experience.jsx — activeTab (useState) filters a hardcoded timelineData array; no fetching, no context.

Contact.jsx — a fully controlled form (formData, errors, submitted, all useState) with synchronous field-level validation on every keystroke and a submit-time re-check before "sending."

Context system layout

There is exactly one context in the app:

ThemeContext (src/components/ThemeContext.jsx) — created with createContext(), no default value. It is provided once, at the very top of the tree in main.jsx, above the router, so every route has access to it.

useTheme() (src/components/useTheme.js) is the only sanctioned way to read it — components should not call useContext(ThemeContext) directly. 

Keeping the raw useContext call out of ThemeContext.jsx's exports (it's commented out there) enforces this in practice.
The provider persists the preference to localStorage and initializes from either the stored value or the OS-level prefers-color-scheme media query, so the correct theme applies on first paint without a flash for returning visitors.

Hook cycle setup

ThemeProvider's effect cycle
render → isDark changes → useEffect([isDark]) fires
  → toggles the "dark" class on <html>
  → writes the new value to localStorage

This is a single, tightly-scoped effect with isDark as its only dependency, so it runs exactly once per theme change — not on every render.

useFetch's effect cycle
render → useEffect([url]) fires
  → loading = true
  → fetch(url) → on success: data + error reset; on failure: error set
  → finally: loading = false
  → cleanup sets isMounted = false if the URL changes or the component unmounts

Because the effect's dependency array is [url] and Projects.jsx passes a hardcoded string literal, this effect runs once on mount and never re-fires from a re-render — searching the repo list is handled entirely client-side via a separate useState, so it doesn't retrigger the network request.

Verified hook safety

No hook sets state that is also present in its own dependency array without a stable reference, so there's no self-triggering loop.
No useEffect is missing a dependency that would cause it to run every render.

StrictMode (enabled in main.jsx) intentionally double-invokes effects in development to surface exactly this class of bug — the app was audited under those conditions (see Self-Audit below) and no double-fetch or runaway-render behavior occurred beyond React's expected dev-mode double-invoke.

Self-Audit

1. Production build
npm run build

Result: passed, 0 errors, 0 warnings. Vite/Rollup compiled all 37 modules and emitted dist/ (HTML, CSS, JS chunks) with no build-time errors.

2. Static analysis (oxlint)
npm run lint

Result: 0 errors, 7 warnings, all cosmetic/dev-experience issues, not runtime bugs:

App.jsx: unused imports (useState, reactLogo, viteLogo, heroImg, useLocation) left over from the Vite starter template.
ThemeContext.jsx: unused useContext import (the real hook lives in useTheme.js); a Fast-Refresh advisory recommending the context object be split into its own file from the provider component.

3. Runtime audit: console errors & infinite re-render loops

Because this is impossible to verify by reading code alone, a headless test was built and executed rather than assumed:

Method

The app's real source files (App.jsx, ThemeContext.jsx, all views) were compiled with the project's own Vite + @vitejs/plugin-react pipeline (no mocked component logic).
The bundle was executed in Node with a jsdom DOM (real document, window, localStorage, matchMedia), under React.StrictMode, using act() so effects and state updates run to completion before assertions.
console.error / console.warn were intercepted and logged for the full run.
Each route (/, /Experience, /Projects, /Contact) was mounted individually via real BrowserRouter navigation (history.pushState), left to settle for 400 ms (covering initial render + effects + the simulated GitHub fetch), then observed with a MutationObserver for an additional idle 600 ms window with no user interaction.
The idle-window mutation count is the infinite-loop signal: a component stuck in a render → state update → render loop keeps mutating the DOM continuously, so it would show a non-zero, growing count during the idle window. A healthy component settles to 0.
fetch was stubbed to return a mock repo payload (avoiding a dependency on live network access during the audit) — useFetch's logic itself is exercised in full; only the actual HTTP round-trip is substituted.

Results

Route	DOM mutations during mount + settle	DOM mutations during 600ms idle window
/ (Home)	3	0
/Experience	3	0
/Projects	12 (loading state → fetched-data render)	0
/Contact	3	0
Console errors: 0 application errors. (The only intercepted console.error call was a harness-level deprecation notice from the react-dom/test-utils act import used by the test itself — not code from this app — and it does not appear in normal npm run dev / npm run build usage.)
Console warnings: 0.

Infinite re-render loops: none detected on any route — every route's DOM fully settles (0 mutations) once effects and the mock fetch resolve.

Confirmed: zero console errors and zero infinite re-render loops across all four routes, under a production-equivalent build compiled from the project's actual source, tested with React StrictMode enabled.

Disclaimer: AI was used to aid in the creation of this application; specficially Google Gemini AI and Claude AI.