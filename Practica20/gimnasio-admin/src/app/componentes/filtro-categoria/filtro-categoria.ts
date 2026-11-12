import { Component, inject } from '@angular/core';
import { CATEGORIAS } from '../../modelos/clase';
import { Catalogo } from '../../servicios/catalogo';

@Component({
  selector: 'app-filtro-categoria',
  standalone: true,
  templateUrl: './filtro-categoria.html',
  styleUrl: './filtro-categoria.css',
})
export class FiltroCategoria {
  readonly catalogo = inject(Catalogo);
  readonly categorias = CATEGORIAS;
}