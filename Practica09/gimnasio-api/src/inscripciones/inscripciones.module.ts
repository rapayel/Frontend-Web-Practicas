import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens';
import { InscripcionPrismaRepository } from './infra/inscripcion.prisma-repository';

@Module({
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionPrismaRepository,
    },
  ],
  exports: [InscripcionesService],
})
export class InscripcionesModule {}