import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import { Auth } from "src/entities/Auth";
import { User } from "src/entities/User";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth, User]),
        
    ],
    providers: [AuthServices, MessageComponent, ApiResponseService,UserService,UserRepository],
    exports: [TypeOrmModule, AuthServices,AuthServices],
    controllers: [AuthController],
})

export class AuthModule {

}