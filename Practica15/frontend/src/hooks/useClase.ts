import { useEffect, useState } from 'react';
import { mensajeDeError } from '../servicios/api';
import { traerClase } from '../servicios/gimnasio';
import type { ClaseConHorarios } from '../tipos';

export function useClase(id: number | undefined) {
  const [clase, setClase] = useState<ClaseConHorarios | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let vigente = true;

    if (id === undefined || !Number.isInteger(id) || id < 1) {
      setError('El identificador de la clase no es válido.');
      setCargando(false);
      return () => {
        vigente = false;
      };
    }

    traerClase(id)
      .then((resultado) => {
        if (vigente) setClase(resultado);
      })
      .catch((e: unknown) => {
        if (vigente) {
          setError(mensajeDeError(e, 'No se pudo cargar la clase.'));
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [id, intento]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntento((actual) => actual + 1);
  }

  return { clase, cargando, error, reintentar };
}
