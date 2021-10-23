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
    // Charger 객체생성
    const newCharger = new Charger();
    newCharger.stationId = createChargerDto.stationId;
    newCharger.addr = createChargerDto.addr;
    newCharger.lat = createChargerDto.lat;
    newCharger.lng = createChargerDto.lng;
    newCharger.status = createChargerDto.status;

    // entity 생성
    const createCharger = await this.chargerRepository.create(newCharger);
    // DB저장
    const charger = await this.chargerRepository.save(createCharger);

    return charger;
  }

  async findChargerByChargerId(chargerId: number): Promise<Charger> {
    // chargerId로 Charger 조회
    const findCharger = await this.chargerRepository.findOne({ chargerId });
    // null check
    if (!findCharger) {
      throw new NotFoundException(`Not Found Charger chargerId = ${chargerId}`);
    }
    return findCharger;
  }

  async findAllCharger(): Promise<Charger[]> {
    // 모든 charger 조회
    const findChargers = await this.chargerRepository.find({});
    return findChargers;
  }

  async updateCharger(
    updateChargerDto: UpdateChargerDto,
    chargerId: number,
  ): Promise<Charger> {
    const qr = getConnection().createQueryRunner();
    try {
      // transaction 시작
      qr.startTransaction();
      // chargerId로 Charger 조회
      const findCharger = await this.findChargerByChargerId(chargerId);

      // Client에서 받은 Dto값으로 수정
      findCharger.addr = updateChargerDto.addr;
      findCharger.lat = updateChargerDto.lat;
      findCharger.lng = updateChargerDto.lng;
      findCharger.status = updateChargerDto.status;

      // 저장
      const updateCharger = await this.chargerRepository.save(findCharger);

      // commit transaction
      qr.commitTransaction();
      return updateCharger;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }

  async deleteCharger(chargerId: number): Promise<Charger> {
    // chragerId로 삭제할 Charger 조회
    const del = await this.findChargerByChargerId(chargerId);
    if (!del) {
      throw new NotFoundException(`Not Found Charger ${del.chargerId}`);
    }
    const ret = await this.chargerRepository.delete({ chargerId });
    return del;
  }
}
