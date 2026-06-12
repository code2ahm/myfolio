import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);

    let links = document.querySelectorAll(".header ul a");
    const cleanupLinks: Array<() => void> = [];
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      const onClick = (e: Event) => {
        if (window.innerWidth > 1024) {
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && document.querySelector(section)) {
            e.preventDefault();
            smoother.scrollTo(section, true, "top top");
          }
        }
      };
      element.addEventListener("click", onClick);
      cleanupLinks.push(() => element.removeEventListener("click", onClick));
    });
    const onResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cleanupLinks.forEach((cleanup) => cleanup());
      window.removeEventListener("resize", onResize);
      smoother?.kill();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/ahm.png" alt="AHM" className="navbar-logo" />
        </a>
        <a
          href="mailto:mru3337@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          mru3337@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="/#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="/#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="/#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
