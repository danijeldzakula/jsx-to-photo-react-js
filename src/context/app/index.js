import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.history.action === "POP") {
      window.addEventListener("unload", (e) => {
        return window.scrollTo(0, 0);
      });
    }
    if (window.history.scrollRestoration) {
      if (window.history.scrollRestoration === "auto") {
        window.history.scrollRestoration = "manual";
      }
      window.addEventListener("unload", () => {
        return window.scrollTo(0, 0);
      });
    }
    return () => {
      return window.scrollTo(0, 0);
    };
  }, [location]);

  const values = useMemo(() => {
    return {
      location,
      logged,
      setLogged,
    };
  }, [location, logged, setLogged]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useApps = () => {
  return useContext(AppContext);
};

export { AppProvider, useApps };
