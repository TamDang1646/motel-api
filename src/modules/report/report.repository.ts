import { Report } from "src/entities/Report.entity";
import {
  EntityRepository,
  Repository,
} from "typeorm";

EntityRepository(Report)
export default class ReportRepository extends Repository<Report> {

}