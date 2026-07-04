import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const [isTouchView, setIsTouchView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");

    const updateTouchView = () => {
      setIsTouchView(media.matches);
    };

    updateTouchView();
    media.addEventListener("change", updateTouchView);

    return () => {
      media.removeEventListener("change", updateTouchView);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleActive = (index: number) => {
    if (!isTouchView) return;
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (!isTouchView) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleActive(index);
    }
  };

  const getCardClassName = (index: number) => {
    const isActive = isTouchView && activeIndex === index;
    const isSibling =
      isTouchView && activeIndex !== null && activeIndex !== index;

    return `what-content what-noTouch ${isActive ? "what-content-active" : ""} ${
      isSibling ? "what-sibling" : ""
    }`;
  };

  return (
    <div className={`whatIDO${isVisible ? " what-visible" : ""}`} ref={sectionRef}>
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className={getCardClassName(0)}
            ref={(el) => setRef(el, 0)}
            role={isTouchView ? "button" : undefined}
            tabIndex={isTouchView ? 0 : undefined}
            aria-expanded={isTouchView ? activeIndex === 0 : undefined}
            onClick={() => toggleActive(0)}
            onKeyDown={(event) => handleKeyDown(event, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>FRONTEND</h3>
              <h4>Building Interactive UIs</h4>
              <p>
                Crafting performant, responsive interfaces with modern
                frameworks. From SPAs to micro-frontends, I deliver
                pixel-perfect experiences.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">Material UI</div>
                <div className="what-tags">HTML5</div>
                <div className="what-tags">CSS3</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className={getCardClassName(1)}
            ref={(el) => setRef(el, 1)}
            role={isTouchView ? "button" : undefined}
            tabIndex={isTouchView ? 0 : undefined}
            aria-expanded={isTouchView ? activeIndex === 1 : undefined}
            onClick={() => toggleActive(1)}
            onKeyDown={(event) => handleKeyDown(event, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>BACKEND</h3>
              <h4>Scalable Server Architecture</h4>
              <p>
                Designing robust APIs and microservices. From CMS platforms to
                complex business logic, I build backends that scale.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">NoSQL</div>
                <div className="what-tags">REST APIs</div>
                <div className="what-tags">Python</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
