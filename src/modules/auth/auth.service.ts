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

    /**
     * 
     * @param authData 
     * @returns 
     */
    async createUser(authData: any) {       
        const isDuplicated = await this.repository.findOne(
            {
                where: [
                    { phoneNumber: authData.phoneNumber},
                ]
            }
        )            
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
        return new User(result.generatedMaps[0])
    }


    /**
     * 
     * @param id 
     * @returns 
     */
    async getAuth(id: any) {
        return await this.repository.findOne(
            {
                where: [
                    { id: id },
                ]
            }
        )
    }


    /**
     * 
     * @returns 
     */
    async getAll(): Promise<Auth[]> {
        // const query = this.repository.manager.createQueryBuilder<Auth>(Auth, "auth")
        //     .select("*")
        // console.log("query",query.getQuery(),await query.getMany());
        
        // return await query.getMany()
        return await this.repository.find()
            
    }


    /**
     * 
     * @param phoneNumber 
     * @returns 
     */
    async getAuthByPhone(phoneNumber: string): Promise<Auth> {
        return await this.repository.findOne({
            where: {
                phoneNumber
            }
        })
        
    }


    async updateAuth(id, data: unknown): Promise<any> {
        try {
            const result = await this.repository.update(id, data)
            if (result.affected) {
                return await this.repository.findOneBy({ id })
            } else {
                throw new DatabaseError(
                    "UPDATE_ERROR",
                    "authId không tồn tại",
                    ErrorCodes.UPDATE_ERROR
                )
            }
        } catch (error) {
            throw new DatabaseError(
                "UPDATE_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.UPDATE_ERROR
            )
        }
     }
}     