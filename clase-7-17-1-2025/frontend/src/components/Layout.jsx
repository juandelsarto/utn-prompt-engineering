import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className="has-background-primary p-3">
        <nav className="container">
          <ul className="is-flex is-justify-content-space-between">
            <li>
              <Link className="has-text-white" to={"/"}>
                Products
              </Link>
            </li>
            <li>
              <Link className="has-text-white" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{ minHeight: "100vh" }} className="container mt-5">{children}</main>
      <footer className="footer has-background-light p-4">
        <div className="content has-text-centered">
          <h4>Sitio creado por Gabriel Alberini</h4>
        </div>
      </footer>
    </>
  );
};

export { Layout };
