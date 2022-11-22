import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import { User } from "src/entities/User.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserService, MessageComponent, ApiResponseService],
    exports: [TypeOrmModule],
    controllers: [UserController],
})

export class UserModule {

}