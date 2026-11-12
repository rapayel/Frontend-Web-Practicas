import { Component, inject } from '@angular/core';
import { FiltroCategoria } from './componentes/filtro-categoria/filtro-categoria';
import { TarjetaClase } from './componentes/tarjeta-clase/tarjeta-clase';
import { Catalogo } from './servicios/catalogo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaClase, FiltroCategoria],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly catalogo = inject(Catalogo);
}