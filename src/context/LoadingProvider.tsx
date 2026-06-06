import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    if (loading < 100) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(100);
      setIsLoading(false);
    }, 6500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      import("../components/utils/initialFX").then((module) => {
        module.initialFX?.();

        const targetHash =
          sessionStorage.getItem("scrollToWorkAfterLoad") === "true"
            ? "#work"
            : window.location.hash;

        if (!targetHash) return;

        sessionStorage.removeItem("scrollToWorkAfterLoad");

        window.setTimeout(() => {
          const target = document.querySelector(targetHash);
          if (!target) return;

          import("../components/Navbar").then(({ smoother }) => {
            if (smoother) {
              smoother.scrollTo(targetHash, true, "top top");
              return;
            }

            target.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }, 350);
      });
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
