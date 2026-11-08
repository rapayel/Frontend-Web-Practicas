import { create } from 'zustand';
import { mensajeDeError } from '../servicios/api.ts';
import { traerMisInscripciones } from '../servicios/gimnasio.ts';
import type { Inscripcion } from '../tipos.ts';

interface EstadoInscripciones {
  inscripciones: Inscripcion[];
  cargando: boolean;
  error: string | null;
  cargarInscripciones: () => Promise<void>;
  vaciarInscripciones: () => void;
}

export const useInscripcionesStore = create<EstadoInscripciones>()((set) => ({
  inscripciones: [],
  cargando: false,
  error: null,

  cargarInscripciones: async () => {
    set({ cargando: true, error: null });
    try {
      set({ inscripciones: await traerMisInscripciones() });
    } catch (error) {
      set({
        error: mensajeDeError(
          error,
          'No se pudieron cargar tus inscripciones.',
        ),
      });
    } finally {
      set({ cargando: false });
    }
  },

  vaciarInscripciones: () =>
    set({ inscripciones: [], cargando: false, error: null }),
}));
