import { Link, useParams } from 'react-router-dom';
import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';
import { useClase } from '../hooks/useClase';
import { urlImagen } from '../servicios/api';

export function PaginaDetalleClase() {
  const { id } = useParams<{ id: string }>();
  const idNumerico = id ? Number(id) : undefined;
  const { clase, cargando, error, reintentar } = useClase(idNumerico);

  if (cargando) return <Cargando />;
  if (error || !clase) {
    return (
      <MensajeError
        mensaje={error ?? 'No se encontró la clase solicitada.'}
        onReintentar={reintentar}
      />
    );
  }

  return (
    <>
      <Link to="/clases" className="detalle__volver">
        ← Volver a clases
      </Link>

      <section className="detalle">
        <img
          src={urlImagen(clase.imagen)}
          alt={clase.nombre}
          className="detalle__imagen"
        />

        <div className="detalle__datos">
          <span className={`etiqueta etiqueta--${clase.categoria}`}>
            {clase.categoria}
          </span>
          <h1>{clase.nombre}</h1>
          <p>{clase.descripcion}</p>
          <p className="tarjeta-clase__meta">
            Duración: {clase.duracionMin} minutos
          </p>

          <h2>Horarios disponibles</h2>
          {clase.horarios.length > 0 ? (
            <ul className="horarios">
              {clase.horarios.map((horario) => {
                const estaLleno = horario.disponibles <= 0;

                return (
                  <li
                    key={horario.id}
                    className="horario"
                  >
                    <div>
                      <div className="horario__dia">
                        {horario.dia} · {horario.horaInicio}
                      </div>
                      <div className="horario__meta">
                        Entrenador: {horario.entrenador}
                      </div>
                      <div
                        className={
                          estaLleno ? 'horario__lleno' : 'horario__meta'
                        }
                      >
                        {estaLleno
                          ? 'Cupo lleno'
                          : `${horario.disponibles} lugares disponibles`}
                      </div>
                    </div>
                    {estaLleno ? (
                      <button
                        type="button"
                        className="boton boton--chico"
                        disabled
                      >
                        Inscribirme
                      </button>
                    ) : (
                      <Link
                        to="/entrar"
                        className="boton boton--chico"
                      >
                        Inscribirme
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="pagina__bajada">
              No hay horarios disponibles para esta clase.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
