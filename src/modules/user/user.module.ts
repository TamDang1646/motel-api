import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import RedisComponent from "src/components/redis.component";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AgoraTokenService } from "./agora-token.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        UserModule,
    ],
    providers: [UserService, RedisComponent, MessageComponent, ApiResponseService, AgoraTokenService],
    exports: [TypeOrmModule, UserService],
    controllers: [UserController],
})

export class UserModule {

}
