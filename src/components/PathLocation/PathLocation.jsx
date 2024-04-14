import "../PathLocation/pathLocation.css";
import { useLocation } from "react-router-dom";

function PathLocation({ children }) {
  const { pathname } = useLocation();

  console.log("pathName " + typeof pathname);

  let arrRutas = pathname.split("/");

  arrRutas.shift();

  return (
    <>
      {pathname != "/" && (
        <section className={`location `}>
          <div className="location__urls">
            <span className="location__urls--ruta">
              Home
              {arrRutas.map((ruta, index) => {
                return <strong key={ruta + index}>{` / ${ruta}`}</strong>;
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
