import "../page404/page404.css";
import { Link } from "react-router-dom";
// import Page404 from "./Page404";
function Page404() {
  return (
    <>
      <section className="page404 flexcolum">
        <h2 className="page404__h2">404</h2>
        <h3 className="page404__h3">Page Not Found</h3>
        <p className="page404__p">
          The page you are looking for does not exist.
        </p>
        <Link to={"/"} className="page404__link">
          Go Back Home
        </Link>
      </section>
    </>
  );
}

export default Page404;
