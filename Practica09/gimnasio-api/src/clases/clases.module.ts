import { Module } from '@nestjs/common';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { ClasePrismaRepository } from './clases.prisma-repository';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    {
      provide: 'ClaseRepository',
      useClass: ClasePrismaRepository,
    },
  ],
  exports: [ClasesService],
})
export class ClasesModule {}