import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Jugador, Equipo } from "../types";

function FormularioJugador() {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    dorsal: "",
    salario: "",
    posicion: "PORTERO",
    equipo: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/equipos")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error(err));
  }, []);

  //esto es por si editas que ya te aparezca los jugadores, lo mismo en equipo
  useEffect(() => {
    if (esEdicion) {
      fetch(`http://localhost:8080/jugadores/${id}`)
        .then((res) => res.json())
        .then((data: Jugador) => {
          setFormData({
            nombre: data.nombre,
            fechaNacimiento: data.fechaNacimiento,
            dorsal: data.dorsal.toString(),
            salario: data.salario.toString(),
            posicion: data.posicion,
            equipo: data.equipo,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id, esEdicion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jugadorData = {
      nombre: formData.nombre,
      fechaNacimiento: formData.fechaNacimiento,
      dorsal: parseInt(formData.dorsal),
      salario: parseFloat(formData.salario),
      posicion: formData.posicion,
      equipo: formData.equipo,
    };

    const url = esEdicion
      ? `http://localhost:8080/jugadores/${id}`
      : "http://localhost:8080/jugadores";

    const method = esEdicion ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jugadorData),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/jugadores");
        } else {
          alert("Error al guardar el jugador");
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{esEdicion ? "Editar" : "Crear"} Jugador</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
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
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            value={formData.fechaNacimiento}
            onChange={(e) =>
              setFormData({ ...formData, fechaNacimiento: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dorsal</label>
          <input
            type="number"
            className="form-control"
            value={formData.dorsal}
            onChange={(e) =>
              setFormData({ ...formData, dorsal: e.target.value })
            }
            min="1"
            max="99"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salario</label>
          <input
            type="number"
            className="form-control"
            value={formData.salario}
            onChange={(e) =>
              setFormData({ ...formData, salario: e.target.value })
            }
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Posición</label>
          <select
            className="form-select"
            value={formData.posicion}
            onChange={(e) =>
              setFormData({ ...formData, posicion: e.target.value })
            }
            required
          >
            <option value="PORTERO">PORTERO</option>
            <option value="DEFENSA">DEFENSA</option>
            <option value="MEDIOCENTRO">MEDIOCENTRO</option>
            <option value="DELANTERO">DELANTERO</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Equipo</label>
          <select
            className="form-select"
            value={formData.equipo}
            onChange={(e) =>
              setFormData({ ...formData, equipo: e.target.value })
            }
            required
          >
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.nombre}>
                {equipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success me-2">
          {esEdicion ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/jugadores")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormularioJugador;
