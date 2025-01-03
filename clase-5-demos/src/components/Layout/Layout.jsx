import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <i className='bx bxs-pizza me-2'></i>
              <span>Bootstrap</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/plan-estatico">Plan estático</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/plan-dinamico">Plan dinámico</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Sobre nosotros</h5>
              <p>Somos un equipo especializado en ofrecer soluciones digitales para restaurantes que desean modernizar su carta. Brindamos a los negocios herramientas innovadoras para mejorar la experiencia de sus clientes.</p>
            </div>
            <div className="col-md-4">
              <h5>Enlaces útiles</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Inicio</a></li>
                <li><a href="#" className="text-light text-decoration-none">Planes</a></li>
                <li><a href="mailto:ñammenu@gmail.com" className="text-light text-decoration-none">Contacto</a></li>
                <li><a href="#" className="text-light text-decoration-none">FAQ</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Síguenos</h5>
              <a href="#" className="text-light me-3"><i className='bx bxl-facebook-circle'></i></a>
              <a href="#" className="text-light me-3"><i className='bx bxl-twitter'></i></a>
              <a href="#" className="text-light me-3"><i className='bx bxl-instagram'></i></a>
              <a href="#" className="text-light"><i className='bx bxl-linkedin'></i></a>
            </div>
          </div>
          <div className="text-center pt-3">
            <p>&copy; 2025 - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

    </>
  )
};

export { Layout };