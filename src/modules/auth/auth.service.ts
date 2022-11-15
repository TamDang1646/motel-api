import { BaseService } from "src/base/base.service";
import { Auth } from "src/entities/Auth";
import { LoggerService } from "src/logger/custom.logger";
import { DataSource } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepository } from "../user/user.repository";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthServices extends BaseService<Auth, AuthRepository> {
    constructor(
        @InjectRepository(Auth)
        protected readonly repo: AuthRepository,
        protected readonly userRepo: UserRepository,
        protected readonly logger: LoggerService,
        protected readonly dataSource: DataSource,
    ) {
        super(repo, logger)
    }
    async createUser(params: any) {
        let data = { ...params };

        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.query("SELECT * FROM user")
        await queryRunner.startTransaction()
        try {
            console.log("dataSer", data);
            const res = await queryRunner.getTable("auth")
            // const res = await this.repo.save(data);
            console.log("res", res);
            
            // const res2 = await this.userRepo.save(data)
            // console.log("res2",res2);
            
            const response = await queryRunner.manager.save(data)     
            console.log("response",response);
                // commit transaction now:
            await queryRunner.commitTransaction()
            return 
            // execute some operations on this transaction:
        } catch (err) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction()
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release()
        }
    }
}     