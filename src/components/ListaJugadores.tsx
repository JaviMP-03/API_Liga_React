import { useState, useEffect } from "react";
import { Jugador } from "../types";
import { useNavigate } from "react-router-dom";

function ListaJugadores() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/jugadores")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los jugadores");
        }
        return response.json();
      })
      .then((data) => {
        setJugadores(data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, []);

  const eliminarJugador = (id: number, nombre: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
      fetch(`http://localhost:8080/jugadores/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setJugadores(jugadores.filter((j) => j.id !== id));
          } else {
            alert("Error al eliminar el jugador");
          }
        })
        .catch((error) => {
          alert("Error al eliminar el jugador: " + error.message);
        });
    }
  };

  if (cargando) {
    return (
      <div className="container mt-5" style={{ maxWidth: "90%" }}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Jugadores</h1>
          <button
            className="btn btn-success"
            onClick={() => navigate("/jugadores/nuevo")}
          >
            Crear Jugador
          </button>
        </div>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Equipo</th>
              <th>Posición</th>
              <th>Dorsal</th>
              <th>Edad</th>
              <th>Salario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador) => (
              <tr key={jugador.id}>
                <td>{jugador.id}</td>
                <td>{jugador.nombre}</td>
                <td>{jugador.equipo}</td>
                <td>{jugador.posicion}</td>
                <td>{jugador.dorsal}</td>
                <td>{jugador.edad}</td>
                <td>{jugador.salario.toLocaleString("es-ES")} €</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/jugadores/editar/${jugador.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarJugador(jugador.id, jugador.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaJugadores;
