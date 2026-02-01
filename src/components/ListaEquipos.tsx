import { useState, useEffect } from "react";
import { Equipo } from "../types";
import { useNavigate } from "react-router-dom";

function ListaEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/equipos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los equipos");
        }
        return response.json();
      })
      .then((data) => {
        setEquipos(data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, []);

  const eliminarEquipo = (id: number, nombre: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar al equipo ${nombre}?`,
      )
    ) {
      fetch(`http://localhost:8080/equipos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setEquipos(equipos.filter((e) => e.id !== id));
          } else {
            alert("Error al eliminar el equipo");
          }
        })
        .catch((error) => {
          alert("Error al eliminar el equipo: " + error.message);
        });
    }
  };

  if (cargando) {
    return (
      <div className="container mt-5">
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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Equipos</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate("/equipos/nuevo")}
        >
          Crear Equipo
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estadio</th>
            <th>Capacidad</th>
            <th>Entrenador</th>
            <th>Fundación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td>{equipo.id}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.nombreEstadio}</td>
              <td>{equipo.capacidad.toLocaleString("es-ES")}</td>
              <td>{equipo.nombreEntrenador}</td>
              <td>
                {new Date(equipo.fechaFundacion).toLocaleDateString("es-ES")}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/equipos/editar/${equipo.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarEquipo(equipo.id, equipo.nombre)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaEquipos;
