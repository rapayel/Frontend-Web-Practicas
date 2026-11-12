import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clase } from '../../modelos/clase';

@Component({
  selector: 'app-tarjeta-clase',
  standalone: true,
  templateUrl: './tarjeta-clase.html',
  styleUrl: './tarjeta-clase.css'
})
export class TarjetaClase {
  @Input({ required: true }) clase!: Clase;
  @Input() activa = false;

  @Output() seleccionar = new EventEmitter<Clase>();

  alHacerClic(): void {
    this.seleccionar.emit(this.clase);
  }
}