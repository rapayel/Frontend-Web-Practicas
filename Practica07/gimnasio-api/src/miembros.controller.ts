import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @Get()
  listar() {
    return this.miembrosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    const miembro = this.miembrosService.buscar(id);
    if (!miembro) {
      throw new NotFoundException(`Miembro con id ${id} no encontrado`);
    }
    return miembro;
  }

  @Post()
  crear(@Body() dto: CrearMiembroDto) {
    return this.miembrosService.crear(dto);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarMiembroDto,
  ) {
    const actualizado = this.miembrosService.actualizar(id, dto);
    if (!actualizado) {
      throw new NotFoundException(`Miembro con id ${id} no encontrado`);
    }
    return actualizado;
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    const eliminado = this.miembrosService.eliminar(id);
    if (!eliminado) {
      throw new NotFoundException(`Miembro con id ${id} no encontrado`);
    }
    return { mensaje: `Miembro con id ${id} eliminado correctamente` };
  }
}