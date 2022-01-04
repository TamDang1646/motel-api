import { MessageComponent } from "src/components/message.component";

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
    ],
    controllers: [SettingsController],
    providers: [SettingsService, MessageComponent]
})

export class SettingsModule { }
