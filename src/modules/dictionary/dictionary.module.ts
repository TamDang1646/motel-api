import RedisComponent from "src/components/redis.component";

import { Module } from "@nestjs/common";

import { DictionaryController } from "./dictionary.controller";
import { DictionaryService } from "./dictionary.service";
import { MessageComponent } from "src/components/message.component";

@Module({
    controllers: [DictionaryController],
    providers: [DictionaryService, RedisComponent, MessageComponent]
})
export class DictionaryModule { }
