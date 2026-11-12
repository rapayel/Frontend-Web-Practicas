import { Component, input, output } from '@angular/core';
import { Clase } from '../../modelos/clase';

@Component({
  selector: 'app-tarjeta-clase',
  standalone: true,
  templateUrl: './tarjeta-clase.html',
  styleUrl: './tarjeta-clase.css',
})
export class TarjetaClase {
  clase = input.required<Clase>();
  activa = input(false);

  seleccionar = output<Clase>();

  alHacerClic(): void {
    this.seleccionar.emit(this.clase());
  }
}