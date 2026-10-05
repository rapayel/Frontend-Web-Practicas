import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InscripcionRepository } from '../dominio/inscripcion.repository';
import { Inscripcion, Horario, Miembro } from '../dominio/entidades';

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async guardar(data: any): Promise<Inscripcion> {
    const creada = await this.prisma.inscripcion.create({ data });
    return creada as unknown as Inscripcion;
  }

  async listar(): Promise<Inscripcion[]> {
    const lista = await this.prisma.inscripcion.findMany();
    return lista as unknown as Inscripcion[];
  }

  async buscarPorId(id: number): Promise<Inscripcion | null> {
    const encontrada = await this.prisma.inscripcion.findUnique({ where: { id } });
    if (!encontrada) return null;
    return encontrada as unknown as Inscripcion;
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    try {
      const eliminada = await this.prisma.inscripcion.delete({ where: { id } });
      return eliminada as unknown as Inscripcion;
    } catch {
      return null;
    }
  }

  async buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    const lista = await this.prisma.inscripcion.findMany({
      where: { horarioId },
    });
    return lista as unknown as Inscripcion[];
  }

  async buscarHorario(id: number): Promise<Horario | null> {
    const horario = await this.prisma.horario.findUnique({ where: { id } });
    if (!horario) return null;
    return horario as unknown as Horario;
  }

  async buscarMiembro(id: number): Promise<Miembro | null> {
    const miembro = await this.prisma.miembro.findUnique({ where: { id } });
    if (!miembro) return null;
    return miembro as unknown as Miembro;
  }
}