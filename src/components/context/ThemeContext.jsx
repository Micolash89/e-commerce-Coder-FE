import { createContext } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  let cookieTheme = Cookies.get("theme");

  if (cookieTheme == undefined) {
    cookieTheme = "true";
  }

  const [theme, setTheme] = useState(
    cookieTheme.includes("true") ? "ligth" : "dark"
  );

  const handleTheme = (change) => setTheme(change);

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
