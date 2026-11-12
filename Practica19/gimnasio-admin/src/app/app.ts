import { Component, computed, signal } from '@angular/core';
import { FiltroCategoria, FiltroCategoriaValor } from './componentes/filtro-categoria/filtro-categoria';
import { TarjetaClase } from './componentes/tarjeta-clase/tarjeta-clase';
import { CLASES_LOCALES } from './datos/clases-locales';
import { Clase } from './modelos/clase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaClase, FiltroCategoria],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  clases = signal<Clase[]>(CLASES_LOCALES);
  categoriaActiva = signal<FiltroCategoriaValor>('todas');
  claseSeleccionada = signal<Clase | null>(null);

  clasesFiltradas = computed(() => {
    const filtro = this.categoriaActiva();
    if (filtro === 'todas') {
      return this.clases();
    }
    return this.clases().filter((c) => c.categoria === filtro);
  });

  totalClases = computed(() => this.clases().length);
  totalFuerza = computed(() => this.clases().filter((c) => c.categoria === 'fuerza').length);
  totalCardio = computed(() => this.clases().filter((c) => c.categoria === 'cardio').length);
  totalFlexibilidad = computed(() => this.clases().filter((c) => c.categoria === 'flexibilidad').length);

  cambiarCategoria(categoria: FiltroCategoriaValor): void {
    this.categoriaActiva.set(categoria);
    const actual = this.claseSeleccionada();
    if (actual && categoria !== 'todas' && actual.categoria !== categoria) {
      this.claseSeleccionada.set(null);
    }
  }

  seleccionarClase(clase: Clase): void {
    this.claseSeleccionada.set(clase);
  }
}