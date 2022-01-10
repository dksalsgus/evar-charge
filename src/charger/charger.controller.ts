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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Charger API')
export class ChargerController {
  constructor(private readonly chargerService: ChargerService) {}

  @Post('chargers')
  @ApiOperation({summary:'충전기 추가'})
  async createCharger(
    @Body() createChargerDto: CreateChargerDto,
  ): Promise<Charger> {
    const charger = await this.chargerService.createCharger(createChargerDto);
    return charger;
  }

  @Get('chargers/:chargerId')
  @ApiOperation({summary:'충전기 찾기'})
  async findChargerByChargerId(
    @Param('chargerId') chargerId: number,
  ): Promise<Charger> {
    const charger = await this.chargerService.findChargerByChargerId(chargerId);
    return charger;
  }

  @Get('chargers')
  @ApiOperation({summary:'충전기 모두 찾기'})
  async findAllCharger(): Promise<Charger[]> {
    const chargers = await this.chargerService.findAllCharger();
    return chargers;
  }

  @Patch('chargers/:chargerId')
  @ApiOperation({summary:'충전기 수정'})
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
  @ApiOperation({summary:'충전기 삭제'})
  async deleteCharger(@Param('chargerId') chargerId: number): Promise<Charger> {
    const ret = await this.chargerService.deleteCharger(chargerId);
    return ret;
  }
}
