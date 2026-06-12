import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const ResumePage = lazy(() => import("./components/ResumePage"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  if (pathname === "/projects") {
    return (
      <Suspense>
        <ProjectsPage />
      </Suspense>
    );
  }

  if (pathname === "/resume") {
    return (
      <Suspense>
        <ResumePage />
      </Suspense>
    );
  }

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
