import { useEffect, useState } from "react";
import "../buttonUP/buttonUp.css";

function ButtonUp() {
  const [visible, setVisible] = useState(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remover el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        className={`scrollup ${visible ? "visible" : ""}`}
        onClick={scrollUp}
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
}

export default ButtonUp;
