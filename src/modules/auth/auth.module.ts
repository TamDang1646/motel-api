import { ApiResponseService } from "src/api-response/api-response.service";
import ComponentService from "src/components/component";
import { MessageComponent } from "src/components/message.component";
import { Auth } from "src/entities/Auth.entity";
import { PostSave } from "src/entities/PostSave.entity";
import { User } from "src/entities/User.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostSaveService } from "../postSave/postSave.service";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth, User, PostSave]),

    ],
    providers: [AuthServices, MessageComponent, ApiResponseService, UserService, ComponentService, PostSaveService],
    exports: [TypeOrmModule, AuthServices, AuthServices],
    controllers: [AuthController],
})

export class AuthModule {

}