export interface Jugador {
  id: number;
  nombre: string;
  fechaNacimiento: string;
  dorsal: number;
  salario: number;
  posicion: 'PORTERO' | 'DEFENSA' | 'MEDIOCENTRO' | 'DELANTERO';
  equipo: string;
  edad: number;
}

export interface Equipo {
  id: number;
  nombre: string;
  fechaFundacion: string;
  nombreEstadio: string;
  capacidad: number;
  nombreEntrenador: string;
}