import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CATEGORIAS, Categoria } from '../../modelos/clase';

export type FiltroCategoriaValor = Categoria | 'todas';

@Component({
  selector: 'app-filtro-categoria',
  standalone: true,
  templateUrl: './filtro-categoria.html',
  styleUrl: './filtro-categoria.css'
})
export class FiltroCategoria {
  readonly categorias = CATEGORIAS;

  @Input() activa: FiltroCategoriaValor = 'todas';
  @Output() cambiar = new EventEmitter<FiltroCategoriaValor>();

  seleccionar(valor: FiltroCategoriaValor): void {
    this.cambiar.emit(valor);
  }
}