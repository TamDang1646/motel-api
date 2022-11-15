import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import { Connection } from "typeorm";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthServices } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository]),
    ],
    providers: [AuthServices, MessageComponent, ApiResponseService,Connection],
    exports: [TypeOrmModule, AuthServices,AuthServices],
    controllers: [AuthController],
})

export class AuthModule {

}