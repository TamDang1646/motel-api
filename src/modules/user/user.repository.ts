import { User } from "src/entities/User.entity";
import {
  EntityRepository,
  Repository,
} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
