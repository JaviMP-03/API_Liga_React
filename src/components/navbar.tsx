import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Liga de Fútbol
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/jugadores">
            Jugadores
          </Link>
          <Link className="nav-link" to="/equipos">
            Equipos
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
