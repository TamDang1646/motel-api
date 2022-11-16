import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import { Auth } from "src/entities/Auth.entity";
import { User } from "src/entities/User.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth, User]),
        
    ],
    providers: [AuthServices, MessageComponent, ApiResponseService,UserService],
    exports: [TypeOrmModule, AuthServices,AuthServices],
    controllers: [AuthController],
})

export class AuthModule {

}