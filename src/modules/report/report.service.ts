import queryString from "query-string";
import { BaseService } from "src/base/base.service";
import { iPaginationOption } from "src/base/pagination.dto";
import { ErrorCodes } from "src/constants/error-code.const";
import { PostSave } from "src/entities/PostSave.entity";
import { Report } from "src/entities/Report.entity";
import { User } from "src/entities/User.entity";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { LoggerService } from "src/logger/custom.logger";
import {
  InsertResult,
  QueryFailedError,
} from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";

import { CreateReportDto } from "./dto/create-report.dto";
import { GetAllReports } from "./dto/get-all.dto";
import ReportRepository from "./report.repository";

export class ReportService extends BaseService<Report, ReportRepository>{
    constructor(
        @InjectRepository(Report)
        protected readonly repository: ReportRepository,
        protected readonly logger: LoggerService,
    ) {
        super(repository, logger);
    }

    async getAll(params: GetAllReports, paging: iPaginationOption) {
        // const tableName = this.repository.metadata.tableName;
        // const query = this.repository.manager.createQueryBuilder(Report, tableName)
        // query.select('*')
        // if (params.userReport) {
        //     query.andWhere('user_report = :userReport', { userReport: params.userReport });
        // }
        // if (params.reportedPost) {
        //     query.andWhere('reported_post = :reportedPost', { reportedPost: params.reportedPost });
        // }
        // if (params.reportedUser) {
        //     query.andWhere('reported_user = :reportedUser', { reportedUser: params.reportedUser });
        // }
        // query.innerJoin(User,"user","user.id=")

        // return await this.iPaginateCustom<Report>(
        //     query,
        //     paging.page as number,
        //     paging.limit as number,
        //     queryString.stringify({ ...params, ...paging })
        // )
        const query = this.repository.manager.createQueryBuilder(Report, "rp")
            .innerJoin(User, "user", "user.id=rp.user_report")
            .select("rp.*, user.name as username")
        if (params.userReport) {
            query.andWhere('user_report = :userReport', { userReport: params.userReport });
        }
        if (params.reportedPost) {
            query.andWhere('reported_post = :reportedPost', { reportedPost: params.reportedPost });
        }
        if (params.reportedUser) {
            query.andWhere('reported_user = :reportedUser', { reportedUser: params.reportedUser });
        }

        return await this.iPaginateCustom<Report>(
            query,
            paging.page as number,
            paging.limit as number,
            queryString.stringify({ ...params, ...paging })
        )
        // return query.getRawMany()
        // .innerJoinAndSelect("user","user","user.id=rp.user_report","user.name")
    }

    async createReport(report: CreateReportDto) {
        let result: InsertResult
        try {
            result = await this.repository.createQueryBuilder()
                .insert()
                .values(report)
                .execute()
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError("INSERT_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.INSERT_ERROR)
            }
            throw new DatabaseError("DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }
        return new PostSave(result.generatedMaps[0])
    }
}