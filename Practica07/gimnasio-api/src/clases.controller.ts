import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ClasesService } from './clases.service';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  getAll() {
    return this.clasesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const clase = this.clasesService.findOne(Number(id));
    if (!clase) {
      throw new NotFoundException(`No se encontró la clase con id ${id}`);
    }
    return clase;
  }
}