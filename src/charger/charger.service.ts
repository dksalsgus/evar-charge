import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { Charger } from './charger.entity';
import { ChargerRepository } from './charger.repository';
import { CreateChargerDto } from './dto/req-create-charger.dto';
import { UpdateChargerDto } from './dto/req-update-charger.dto';

@Injectable()
export class ChargerService {
  constructor(
    @InjectRepository(ChargerRepository)
    private chargerRepository: ChargerRepository,
  ) {}

  async createCharger(createChargerDto: CreateChargerDto): Promise<Charger> {
    const newCharger = new Charger();
    newCharger.stationId = createChargerDto.stationId;
    newCharger.addr = createChargerDto.addr;
    newCharger.lat = createChargerDto.lat;
    newCharger.lng = createChargerDto.lng;
    newCharger.status = createChargerDto.status;

    const createCharger = await this.chargerRepository.create(newCharger);
    const charger = await this.chargerRepository.save(createCharger);

    return charger;
  }

  async findChargerByChargerId(chargerId: number): Promise<Charger> {
    const findCharger = await this.chargerRepository.findOne({ chargerId });
    if (!findCharger) {
      throw new NotFoundException(`Not Found Charger chargerId = ${chargerId}`);
    }
    return findCharger;
  }

  async findAllCharger(): Promise<Charger[]> {
    const findChargers = await this.chargerRepository.find({});
    return findChargers;
  }

  async updateCharger(
    updateChargerDto: UpdateChargerDto,
    chargerId: number,
  ): Promise<Charger> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      const findCharger = await this.findChargerByChargerId(chargerId);

      findCharger.addr = updateChargerDto.addr;
      findCharger.lat = updateChargerDto.lat;
      findCharger.lng = updateChargerDto.lng;
      findCharger.status = updateChargerDto.status;

      const updateCharger = await this.chargerRepository.save(findCharger);

      qr.commitTransaction();
      return updateCharger;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }

  async deleteCharger(chargerId: number): Promise<Charger> {
    const del = await this.findChargerByChargerId(chargerId);
    const ret = await this.chargerRepository.delete({ chargerId });
    if (ret.affected < 1) {
      throw new NotFoundException(`Not Found Charger ${del.chargerId}`);
    }
    return del;
  }
}
