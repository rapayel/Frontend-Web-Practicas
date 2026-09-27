import { Injectable, Inject } from '@nestjs/common';
import type { MiembroRepository } from './dominio/miembro.repository';
import { MIEMBRO_REPOSITORY } from 'miembros.tokens';
import { Miembro } from './dominio/entidades';
import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly miembroRepository: MiembroRepository,
  ) {}

  listar(): Miembro[] {
    return this.miembroRepository.listar();
  }

  buscar(id: number): Miembro | undefined {
    return this.miembroRepository.buscarPorId(id);
  }

  crear(dto: CrearMiembroDto): Miembro {
    return this.miembroRepository.crear({
      ...dto,
      activo: true,
    });
  }

  actualizar(id: number, dto: ActualizarMiembroDto): Miembro | undefined {
    return this.miembroRepository.actualizar(id, dto);
  }

  eliminar(id: number): boolean {
    return this.miembroRepository.eliminar(id);
  }
}