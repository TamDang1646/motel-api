import { Setting } from "src/entities/Setting";
import {
  EntityRepository,
  Repository,
} from "typeorm";

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting>{

}