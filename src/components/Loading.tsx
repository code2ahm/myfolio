import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

type Phase = "loading" | "clearing" | "typing" | "welcomeErasing" | "expanding";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [phase, setPhase] = useState<Phase>("loading");
  const [displayedText, setDisplayedText] = useState("");
  const [clicked, setClicked] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const clearAll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (percent < 100 || phase !== "loading") return;

    const timeout = setTimeout(() => {
      setPhase("clearing");
    }, 400);

    return () => clearTimeout(timeout);
  }, [percent, phase]);

  // Safety: if stuck at 95% for more than 3s, force to clearing
  useEffect(() => {
    if (phase !== "loading") return;

    const timeout = setTimeout(() => {
      setPhase("clearing");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [phase]);

  // Phase 1: Erase "Loading X%"
  useEffect(() => {
    if (phase !== "clearing") return;

    let text = `Loading ${percent}%`;
    setDisplayedText(text);

    intervalRef.current = window.setInterval(() => {
      if (text.length > 0) {
        text = text.slice(0, -1);
        setDisplayedText(text);
      } else {
        clearAll();
        setPhase("typing");
      }
    }, 35);

    return clearAll;
  }, [phase]);

  // Phase 2: Type "Welcome"
  useEffect(() => {
    if (phase !== "typing") return;

    const target = "Welcome";
    let index = 0;
    setDisplayedText("");

    intervalRef.current = window.setInterval(() => {
      if (index < target.length) {
        index++;
        setDisplayedText(target.slice(0, index));
      } else {
        clearAll();
        setTimeout(() => {
          setPhase("welcomeErasing");
        }, 500);
      }
    }, 65);

    return clearAll;
  }, [phase]);

  // Phase 3: Erase "Welcome"
  useEffect(() => {
    if (phase !== "welcomeErasing") return;

    let text = "Welcome";
    setDisplayedText(text);

    intervalRef.current = window.setInterval(() => {
      if (text.length > 0) {
        text = text.slice(0, -1);
        setDisplayedText(text);
      } else {
        clearAll();
        setClicked(true);
        setPhase("expanding");
      }
    }, 45);

    return clearAll;
  }, [phase]);

  // Phase 4: Expand and exit
  useEffect(() => {
    if (phase !== "expanding") return;

    import("./utils/initialFX").then((module) => {
      setTimeout(() => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      }, 1000);
    });
  }, [phase, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  const showCursor = phase === "clearing" || phase === "typing" || phase === "welcomeErasing";

  const loadingText =
    phase === "loading"
      ? `Loading ${percent}%`
      : phase === "expanding"
        ? ""
        : displayedText;

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          <img src="/images/ahm.png" className="loader-logo" />
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div
            className={`loading-button ${phase === "expanding" ? "loading-complete" : ""}`}
          >
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  {loadingText}
                  {showCursor && <span className="loading-cursor-block" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 75) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(Math.min(percent, 75));
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.max(1, Math.round(Math.random() * 2));
        setLoading(Math.min(percent, 95));
        if (percent > 94) {
          clearInterval(interval);
        }
      }, 250);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function stop() {
    clearInterval(interval);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(Math.min(percent, 100));
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear, stop };
};
