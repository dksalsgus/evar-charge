import { Module } from '@nestjs/common';
import { ChargerService } from './charger.service';
import { ChargerController } from './charger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargerRepository } from './charger.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChargerRepository])],
  providers: [ChargerService],
  controllers: [ChargerController],
})
export class ChargerModule {}
