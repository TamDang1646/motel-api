import { MessageComponent } from "src/components/message.component";
import RedisComponent from "src/components/redis.component";

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService, ConfigService, MessageComponent, RedisComponent]
})
export class NotificationModule { }
