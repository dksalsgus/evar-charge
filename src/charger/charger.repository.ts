import { EntityRepository, Repository } from 'typeorm';
import { Charger } from './charger.entity';

@EntityRepository(Charger)
export class ChargerRepository extends Repository<Charger> {}
