import { Injectable } from '@nestjs/common';

@Injectable()
export class ClasesService {
  private readonly clases = [
    { id: 1, nombre: 'Spinning', cupoMaximo: 10 },
    { id: 2, nombre: 'Yoga', cupoMaximo: 15 },
    { id: 3, nombre: 'Crossfit', cupoMaximo: 12 },
  ];

  findAll() {
    return this.clases;
  }

  findOne(id: number) {
    return this.clases.find((c) => c.id === id);
  }
}