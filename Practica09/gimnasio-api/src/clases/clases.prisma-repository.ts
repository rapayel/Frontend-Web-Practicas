import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Clase } from './clases.service';

export interface ClaseRepository {
  crear(data: any): Promise<Clase>;
  obtenerTodas(): Promise<Clase[]>;
  obtenerPorId(id: number): Promise<Clase | null>;
  actualizar(id: number, data: any): Promise<Clase | null>;
  eliminar(id: number): Promise<boolean>;
}

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(data: any): Promise<Clase> {
    const clase = await this.prisma.clase.create({ data });
    return clase as unknown as Clase;
  }

  async obtenerTodas(): Promise<Clase[]> {
    const clases = await this.prisma.clase.findMany();
    return clases as unknown as Clase[];
  }

  async obtenerPorId(id: number): Promise<Clase | null> {
    const clase = await this.prisma.clase.findUnique({ where: { id } });
    if (!clase) return null;
    return clase as unknown as Clase;
  }

  async actualizar(id: number, data: any): Promise<Clase | null> {
    const actualizada = await this.prisma.clase.update({
      where: { id },
      data,
    });
    return actualizada as unknown as Clase;
  }

  async eliminar(id: number): Promise<boolean> {
    try {
      await this.prisma.clase.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}