import { BaseService } from "src/base/base.service";
import { ErrorCodes } from "src/constants/error-code.const";
import { Auth } from "src/entities/Auth.entity";
import { User } from "src/entities/User.entity";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { LoggerService } from "src/logger/custom.logger";
import {
  InsertResult,
  QueryFailedError,
} from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthServices extends BaseService<Auth, AuthRepository> {
    constructor(
        @InjectRepository(Auth)
        protected readonly repository: AuthRepository,
        protected readonly logger: LoggerService,
    ) {
        super(repository, logger)
    }
    async createUser(authData: any) {
        console.log("authData",authData);
        
        const isDuplicated = await this.repository.findOne(
            {
                where: [
                    { phoneNumber: authData.phoneNumber},
                ]
            }
        )
            console.log("isDuplicated",isDuplicated);
            
        if (isDuplicated) {
            throw new DatabaseError(
                    "USER_PHONE_NUMBER_ALREADY_EXISTS",
                    "Duplicated Phone Number",
                    ErrorCodes.USER_PHONE_NUMBER_ALREADY_EXISTS)
        }

        let result: InsertResult
        try {
            result = await this.repository.createQueryBuilder()
                .insert()
                .values(authData)
                .execute()
        } catch (error: unknown) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError("INSERT_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.INSERT_ERROR)
            }


            throw new DatabaseError("DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }
        console.log("result",result);
        
        return new User(result.generatedMaps[0])
    }

    async getAuth(id: any) {
        return await this.repository.findOne(
            {
                where: [
                    { id: id },
                ]
            }
        )
    }

    async getAll(): Promise<Auth[]> {
        // const query = this.repository.manager.createQueryBuilder<Auth>(Auth, "auth")
        //     .select("*")
        // console.log("query",query.getQuery(),await query.getMany());
        
        // return await query.getMany()
        return await this.repository.find()
            
    }
}     