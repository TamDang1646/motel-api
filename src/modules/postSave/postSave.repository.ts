import { PostSave } from "src/entities/PostSave.entity";
import {
  EntityRepository,
  Repository,
} from "typeorm";

EntityRepository(PostSave)
export default class PostSaveRepository extends Repository<PostSave> {

};
