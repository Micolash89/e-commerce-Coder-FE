import "../PathLocation/pathLocation.css";
import { Link, useLocation } from "react-router-dom";

function PathLocation({ children }) {
  const { pathname } = useLocation();

  let arrRutas = pathname.split("/");

  arrRutas.shift();

  return (
    <>
      {pathname != "/" && (
        <section className={`location `}>
          <div className="location__urls">
            <span className="location__urls--ruta">
              <Link to="/">Home</Link>
              {arrRutas.map((ruta, index) => {
                return (
                  <strong key={ruta + index}>{` / ${
                    ruta.length < 20 ? ruta : ruta.slice(0, 20) + "..."
                  }`}</strong>
                );
              })}
            </span>
          </div>
        </section>
      )}
      {children}
    </>
  );
}

export default PathLocation;
