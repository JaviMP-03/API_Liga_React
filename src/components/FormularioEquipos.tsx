import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Equipo } from "../types";

function FormularioEquipo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  const [formData, setFormData] = useState({
    nombre: "",
    fechaFundacion: "",
    nombreEstadio: "",
    capacidad: "",
    nombreEntrenador: "",
  });

  useEffect(() => {
    if (esEdicion) {
      fetch(`http://localhost:8080/equipos/${id}`)
        .then((res) => res.json())
        .then((data: Equipo) => {
          setFormData({
            nombre: data.nombre,
            fechaFundacion: data.fechaFundacion,
            nombreEstadio: data.nombreEstadio,
            capacidad: data.capacidad.toString(),
            nombreEntrenador: data.nombreEntrenador,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id, esEdicion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const equipoData = {
      nombre: formData.nombre,
      fechaFundacion: formData.fechaFundacion,
      nombreEstadio: formData.nombreEstadio,
      capacidad: parseInt(formData.capacidad),
      nombreEntrenador: formData.nombreEntrenador,
    };

    const url = esEdicion
      ? `http://localhost:8080/equipos/${id}`
      : "http://localhost:8080/equipos";

    const method = esEdicion ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipoData),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/equipos");
        } else {
          alert("Error al guardar el equipo");
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "0 20px" }}>
      <h1 className="mb-4">{esEdicion ? "Editar" : "Crear"} Equipo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Equipo</label>
          <input
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Fundación</label>
          <input
            type="date"
            className="form-control"
            value={formData.fechaFundacion}
            onChange={(e) =>
              setFormData({ ...formData, fechaFundacion: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre del Estadio</label>
          <input
            type="text"
            className="form-control"
            value={formData.nombreEstadio}
            onChange={(e) =>
              setFormData({ ...formData, nombreEstadio: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Capacidad</label>
          <input
            type="number"
            className="form-control"
            value={formData.capacidad}
            onChange={(e) =>
              setFormData({ ...formData, capacidad: e.target.value })
            }
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre del Entrenador</label>
          <input
            type="text"
            className="form-control"
            value={formData.nombreEntrenador}
            onChange={(e) =>
              setFormData({ ...formData, nombreEntrenador: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          {esEdicion ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/equipos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormularioEquipo;
