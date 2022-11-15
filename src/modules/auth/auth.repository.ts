import { Auth } from "src/entities/Auth";
import {
  EntityRepository,
  Repository,
} from "typeorm";

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {

}
