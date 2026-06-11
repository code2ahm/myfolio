import { useEffect, useRef, useState, type MouseEvent } from "react";
import { FaGithub } from "react-icons/fa";
import {
  MdClose,
  MdKeyboardArrowDown,
  MdOpenInNew,
  MdReadMore,
} from "react-icons/md";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import "./styles/ProjectsPage.css";

const projects = [
  {
    name: "Atlas Coup",
    image: "/images/atlscoup.png",
    live: "https://atlscoup.web.app",
    source: "https://github.com/code2ahm/atlcoup",
    description:
      "A self-hosted productivity system - habits, tasks, goals, journal, and a Pomodoro timer all sharing one Firebase-backed dashboard. No subscriptions, no bloat, just your data.",

    points: [
      "Five tools in one: habit tracker, task board, goal planner, daily journal, Pomodoro",
      "Unified analytics view - streaks, completions, and progress at a glance",
      "Firebase Auth + Firestore for real-time sync across sessions",
      "Dark-first UI with Framer Motion transitions and Quicksand typeface",
    ],
    tags: [
      "Firebase",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
    role: "Frontend, Firebase integration, product flow",
    stack: ["React", "Firebase", "JavaScript", "Firestore", "CSS"],
    details:
      "Atlas Coup started as a personal frustration productivity apps either do too much with a paywall or too little with no data ownership. This is the version I actually wanted: a single sign-in, five tools that talk to each other, your data in Firestore, nothing else. The habit tracker feeds into the analytics view, the task board and goals share a priority model, the journal is a plain daily log, and the Pomodoro keeps it all moving. No subscriptions, no third-party telemetry.",
    highlights: [
      "Zustand stores - one per feature, shared across six modules",
      "Custom Health Score algorithm - streaks, consistency, perfect days, trend",
      "Firestore real-time subscriptions with monthly habit rollover",
      "PWA - iOS Add to Home Screen + Chrome beforeinstallprompt",
      "Firebase Auth - Google OAuth, email/password, account linking",
    ],

    architecture: [
      "React + Vite + React Router v6, lazy-loaded protected routes",
      "Zustand per feature - habits, tasks, goals, journal, analytics, auth",
      "Firestore scoped by uid + month ID, analytics computed client-side",
      "Framer Motion transitions, Tailwind + tailwind-merge + clsx",
    ],
  },
  {
    name: "My Portfolio",
    image: "/images/foliopre.gif",
    live: "https://devahm.xyz",
    source: "https://github.com/code2ahm/myfolio",
    description:
      "Personal developer portfolio with GSAP scroll choreography, TypeScript, and hand-crafted CSS.",
    points: [
      "GSAP ScrollTrigger animations throughout",
      "Full TypeScript with Vite",
      "Custom visual system built from scratch",
    ],
    tags: ["TypeScript", "Vite", "GSAP", "CSS3", "React"],
    role: "Design, frontend engineering, animation, deployment",
    stack: ["React", "TypeScript", "Vite", "GSAP", "Three.js", "CSS"],
    details:
      "A personal portfolio built as a motion-heavy identity system rather than a static resume. The site combines a 3D character, scroll choreography, custom loading states, responsive project showcases, and a lightweight archive page.",
    highlights: [
      "Custom 3D character integration with mobile fallbacks",
      "GSAP-driven page transitions and section reveals",
      "Responsive carousel and project archive",
      "Performance tuning around heavy WebGL assets",
    ],
    architecture: [
      "Vite/React app split into focused visual sections",
      "Three.js character layer mounted separately from content",
      "CSS-led component styling with shared accent tokens",
    ],
  },
  {
    name: "CrawlScope",
    image: "/images/crawlscope.png",
    live: "https://crawlscope.vercel.app",
    source: "https://github.com/code2ahm/crawlscope",
    description:
      "Free, instant website auditing tool SEO, performance, accessibility and Core Web Vitals in under 30 seconds. No signup required.",
    points: [
      "50+ checks across SEO, performance, accessibility and technical health",
      "Real Lighthouse scores with Core Web Vitals (LCP, CLS, INP, TTFB)",
      "Export reports to Markdown, HTML, PDF and JSON",
    ],
    tags: ["Next.js", "TypeScript", "Lighthouse", "Puppeteer", "Tailwind"],
    role: "Full-stack engineering, scan engine, UI design, deployment",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lighthouse",
      "Puppeteer",
      "Cheerio",
      "Framer Motion",
    ],
    details:
      "CrawlScope runs a real Lighthouse audit inside headless Chromium via Puppeteer, combines it with deep HTML analysis via Cheerio, and surfaces findings across 5 categories with severity-ranked priority fixes. Zero auth, zero database, zero tracking just scan and fix.",
    highlights: [
      "Real headless Chromium scan with desktop and mobile screenshots",
      "50+ prioritised checks with why-it-matters and how-to-fix guidance",
      "Core Web Vitals: LCP, CLS, INP, TTFB, FCP with threshold indicators",
      "One-click export to Markdown, HTML, PDF and raw JSON",
      "Full API endpoint POST /api/scan returns structured AuditReport",
    ],
    architecture: [
      "Next.js App Router with a single POST /api/scan route handler",
      "Puppeteer launches headless Chromium per request, no persistence",
      "Lighthouse runs on the open Chrome port for accurate scoring",
      "Cheerio parses raw HTML in parallel for SEO and content checks",
      "Results assembled into a typed AuditReport and streamed to client",
    ],
  },
  {
    name: "ASE - Kashmir",
    image: "/images/aseapp.png",
    live: "https://ase-kashmir.web.app",
    source: "https://github.com/code2ahm/aseapp",
    description:
      "Digital platform for an educational initiative based in Kashmir, built for reach and low-bandwidth access.",
    points: [
      "Info hub for students and educators",
      "Accessible design for local reach",
      "Lightweight and fast on slow networks",
    ],
    tags: ["Firebase", "React", "HTML5", "JavaScript"],
    role: "Frontend, content structure, deployment",
    stack: ["React", "Firebase", "JavaScript", "HTML5", "CSS3"],
    details:
      "A web platform for an education initiative in Kashmir. It is structured as a practical information hub, built to load quickly and remain usable for students and educators on inconsistent connections.",
    highlights: [
      "Accessible education-focused content layout",
      "Low-bandwidth conscious page structure",
      "Firebase hosting for simple deployment",
    ],
    architecture: [
      "React single-page frontend",
      "Static content and hosted assets",
      "Firebase-hosted production build",
    ],
  },
  {
    name: "Assister Bot",
    image: "/images/assisterbot.png",
    live: "https://assisterbot.xyz",
    source: "https://github.com/code2ahm/assister",
    description:
      "Discord bot built for automation, moderation, and server assistance without unnecessary bloat.",
    points: [
      "Server automation and moderation",
      "200+ commands and anti-nuke protection",
      "Fast responses with minimal resource usage",
    ],
    tags: ["Python", "Discord.py"],
    role: "Bot development, automation logic, command design",
    stack: ["Python", "Discord.py", "Discord API", "Automation"],
    details:
      "A Discord automation bot built for server assistance, moderation, and utility commands. The system is designed to stay modular so commands and protection features can grow without becoming hard to maintain.",
    highlights: [
      "200+ command surface for server management",
      "Moderation and anti-nuke workflows",
      "Fast command handling with practical resource usage",
    ],
    architecture: [
      "Python bot runtime using Discord.py",
      "Command-oriented module structure",
      "Event listeners for moderation and protection",
    ],
  },
  {
    name: "DcodeFuture",
    image: "/images/dcodie.png",
    live: "https://dcodefuture.com",
    source: "https://github.com/code2ahm/dcodeweb",
    description:
      "Web platform for a local coding education initiative in Kashmir, built to be clean and beginner-friendly.",
    points: [
      "Platform for a local Kashmir coding school",
      "Works well on slow or limited connections",
      "Clean beginner-friendly UI",
    ],
    tags: ["React", "Vite", "HTML5", "CSS3"],
    role: "Frontend, visual system, responsive implementation",
    stack: ["React", "Vite", "HTML5", "CSS3", "JavaScript"],
    details:
      "A public-facing website for a local coding education initiative. It presents courses and learning intent in a simple interface, with a focus on beginner clarity and fast loading.",
    highlights: [
      "Beginner-friendly page hierarchy",
      "Responsive layout for mobile-first access",
      "Clean marketing-style sections without excess weight",
    ],
    architecture: [
      "Vite-powered React frontend",
      "Static page sections and optimized assets",
      "CSS-driven responsive layout",
    ],
  },
];

const ProjectsPage = () => {
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [hintVisible, setHintVisible] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const goBackToWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    sessionStorage.setItem("scrollToWorkAfterLoad", "true");
    window.location.assign("/#work");
  };

  useEffect(() => {
    const revealItems = document.querySelectorAll(".projects-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    revealItems.forEach((item, index) => {
      (item as HTMLElement).style.setProperty("--reveal-index", `${index}`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "projects-modal-open",
      Boolean(activeProject),
    );

    setHintVisible(false);
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
      setTimeout(() => {
        const el = modalContentRef.current;
        if (el) setHintVisible(el.scrollHeight > el.clientHeight + 10);
      }, 80);
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("projects-modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject]);

  const handleModalScroll = () => {
    const el = modalContentRef.current;
    if (!el) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
    if (nearBottom) setHintVisible(false);
  };

  const closeDetails = () => setActiveProject(null);

  return (
    <div className="projects-page">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="projects-main">
            <section className="projects-hero">
              <a
                href="/#work"
                className="projects-back projects-reveal"
                onClick={goBackToWork}
                data-cursor="disable"
              >
                Back to work
              </a>
              <p className="projects-hero-kicker projects-reveal">
                Source-ready builds
              </p>
              <h1 className="projects-reveal">
                Projects<span>Archive</span>
              </h1>
              <p className="projects-hero-copy projects-reveal">
                A fuller pass through the things I have built, with live links,
                repositories, implementation notes, and the tools behind each
                project.
              </p>
              <div className="projects-hero-metrics projects-reveal">
                <span>{projects.length} builds</span>
                <span>Live links</span>
                <span>Source code</span>
              </div>
            </section>

            <section className="projects-grid" aria-label="Project archive">
              {projects.map((project, index) => (
                <article
                  className="projects-card projects-reveal"
                  key={project.name}
                >
                  <div className="projects-card-media">
                    <img src={project.image} alt={`${project.name} preview`} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="projects-card-body">
                    <div className="projects-card-header">
                      <h2>{project.name}</h2>
                      <div className="projects-card-actions">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.name}`}
                          data-cursor="disable"
                        >
                          <MdOpenInNew />
                        </a>
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.name} source`}
                          data-cursor="disable"
                        >
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    <p className="projects-card-desc">{project.description}</p>
                    <ul>
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="projects-card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      className="projects-details-button"
                      type="button"
                      onClick={() => setActiveProject(project)}
                      data-cursor="disable"
                    >
                      <span>Project details</span>
                      <MdReadMore />
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <section className="projects-footer projects-reveal">
              <p>That is the working shelf for now.</p>
              <h2>More builds are always loading in.</h2>
              <div className="projects-footer-actions">
                <a href="/#work" onClick={goBackToWork} data-cursor="disable">
                  Back to work
                </a>
                <a href="/#contact" data-cursor="disable">
                  Start something
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>

      {activeProject && (
        <div
          className="projects-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="projects-modal-title"
        >
          <button
            className="projects-modal-backdrop"
            type="button"
            aria-label="Close project details"
            onClick={closeDetails}
          />
          <article className="projects-modal-panel">
            <button
              className="projects-modal-close"
              type="button"
              onClick={closeDetails}
              aria-label="Close project details"
              data-cursor="disable"
            >
              <MdClose />
            </button>

            <div className="projects-modal-media">
              <img
                src={activeProject.image}
                alt={`${activeProject.name} expanded preview`}
              />
            </div>

            <div
              className="projects-modal-content"
              ref={modalContentRef}
              onScroll={handleModalScroll}
            >
              <p className="projects-modal-kicker">{activeProject.role}</p>
              <h2 id="projects-modal-title">{activeProject.name}</h2>
              <p className="projects-modal-desc">{activeProject.details}</p>

              <div className="projects-modal-section">
                <h3>Tech stack used</h3>
                <div className="projects-modal-stack">
                  {activeProject.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>

              <div className="projects-modal-columns">
                <div className="projects-modal-section">
                  <h3>Highlights</h3>
                  <ul>
                    {activeProject.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="projects-modal-section">
                  <h3>Build details</h3>
                  <ul>
                    {activeProject.architecture.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="projects-modal-actions">
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                >
                  <MdOpenInNew />
                  Visit live
                </a>
                <a
                  href={activeProject.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                >
                  <FaGithub />
                  View source
                </a>
              </div>

              <div
                className={`projects-modal-scroll-hint${!hintVisible ? " is-hidden" : ""}`}
              >
                <MdKeyboardArrowDown />
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
