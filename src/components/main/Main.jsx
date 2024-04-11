import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../../css/main.css";

function Main({ children }) {
  const { theme } = useContext(ThemeContext);

  return <main className={`main ${theme}`}>{children}</main>;
}

export default Main;
