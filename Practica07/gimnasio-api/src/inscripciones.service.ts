import { Injectable } from '@nestjs/common';
import { InscripcionRepositoryMemoria } from '../CodigoBase/inscripcion.repository.memoria'; // o la ruta correspondiente

@Injectable()
export class InscripcionesService {
  constructor(
    private readonly repo: InscripcionRepositoryMemoria,
  ) {}
}