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
                  <strong key={ruta + index}>
                    <Link to={`/${ruta}`}>{` / ${ruta}`}</Link>
                  </strong>
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
