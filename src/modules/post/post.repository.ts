import { Posts } from "src/entities/Posts.entity";
import {
  EntityRepository,
  Repository,
} from "typeorm";

EntityRepository(Posts)
export class PostRepository extends Repository<Posts> {

};
