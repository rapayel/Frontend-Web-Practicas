// Lo que NO esta aqui es la parte importante: nada de id, creadaEn,
// y sobre todo nada de estado. Eso lo decide el Service, no quien
// manda la peticion.
import { IsInt, IsNotEmpty } from 'class-validator';

export class CrearInscripcionDto {
  @IsInt()
  @IsNotEmpty()
  horarioId!: number;

  @IsInt()
  @IsNotEmpty()
  miembroId!: number;
}