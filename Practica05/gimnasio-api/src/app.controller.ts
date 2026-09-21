import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private clases = [
    { id: 1, nombre: 'Spinning' },
    { id: 2, nombre: 'Yoga' },
  ];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('clases')
  getClases() {
    return this.clases;
  }

  @Post('clases')
  crearClase(@Body() nuevaClase: { id: number; nombre: string }) {
    this.clases.push(nuevaClase);
    return nuevaClase;
  }
}