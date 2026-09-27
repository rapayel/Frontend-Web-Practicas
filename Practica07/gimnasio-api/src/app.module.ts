import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClasesModule } from './clases/clases.module';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';

@Module({
  imports: [ClasesModule, InscripcionesModule],
  controllers: [AppController, ClasesController, InscripcionesController],
  providers: [AppService, ClasesService, InscripcionesService],
})
export class AppModule {}
