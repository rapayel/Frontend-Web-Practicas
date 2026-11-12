import { Injectable, computed, signal } from '@angular/core';
import { CLASES_LOCALES } from '../datos/clases-locales';
import { Categoria, Clase } from '../modelos/clase';

export type FiltroCategoriaValor = Categoria | 'todas';

@Injectable({
  providedIn: 'root',
})
export class Catalogo {
  readonly clases = signal<Clase[]>(CLASES_LOCALES);
  readonly categoriaElegida = signal<FiltroCategoriaValor>('todas');
  readonly claseSeleccionada = signal<Clase | null>(null);

  readonly clasesVisibles = computed(() => {
    const filtro = this.categoriaElegida();
    if (filtro === 'todas') {
      return this.clases();
    }
    return this.clases().filter((c) => c.categoria === filtro);
  });

  readonly minutosTotales = computed(() =>
    this.clasesVisibles().reduce((acc, c) => acc + c.duracionMin, 0)
  );

  cambiarCategoria(categoria: FiltroCategoriaValor): void {
    this.categoriaElegida.set(categoria);
    const actual = this.claseSeleccionada();
    if (actual && categoria !== 'todas' && actual.categoria !== categoria) {
      this.claseSeleccionada.set(null);
    }
  }

  seleccionarClase(clase: Clase): void {
    this.claseSeleccionada.set(clase);
  }
}