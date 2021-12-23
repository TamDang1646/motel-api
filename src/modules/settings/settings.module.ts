import { MessageComponent } from "src/components/message.component";
import RedisComponent from "src/components/redis.component";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SettingRepository } from "./setting-repository";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SettingRepository
        ]),
        RedisComponent,
    ],
    controllers: [SettingsController],
    providers: [SettingsService, MessageComponent]
})

export class SettingsModule { }
