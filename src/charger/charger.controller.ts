import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChargerService } from './charger.service';
import { Charger } from './charger.entity';
import { CreateChargerDto } from './dto/req-create-charger.dto';
import { UpdateChargerDto } from './dto/req-update-charger.dto';

@Controller()
export class ChargerController {
  constructor(private readonly chargerService: ChargerService) {}

  @Post('chargers')
  async createCharger(
    @Body() createChargerDto: CreateChargerDto,
  ): Promise<Charger> {
    const charger = await this.chargerService.createCharger(createChargerDto);
    return charger;
  }

  @Get('chargers/:chargerId')
  async findChargerByChargerId(
    @Param('chargerId') chargerId: number,
  ): Promise<Charger> {
    const charger = await this.chargerService.findChargerByChargerId(chargerId);
    return charger;
  }

  @Get('chargers')
  async findAllCharger(): Promise<Charger[]> {
    const chargers = await this.chargerService.findAllCharger();
    return chargers;
  }

  @Patch('chargers/:chargerId')
  async updateCharger(
    @Body() updateChargerDto: UpdateChargerDto,
    @Param('chargerId') chargerId: number,
  ): Promise<Charger> {
    const charger = await this.chargerService.updateCharger(
      updateChargerDto,
      chargerId,
    );
    return charger;
  }

  @Delete('chargers/:chargerId')
  async deleteCharger(@Param('chargerId') chargerId: number): Promise<Charger> {
    const ret = await this.chargerService.deleteCharger(chargerId);
    return ret;
  }
}
