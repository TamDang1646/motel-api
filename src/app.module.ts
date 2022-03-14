import { parseRedisUrl } from "parse-redis-url-simple";

import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import {
  APP_FILTER,
  Reflector,
} from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { SentryModule } from "@ntegral/nestjs-sentry";
import { RedisModule } from "@svtslv/nestjs-ioredis";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageComponent } from "./components/message.component";
import RedisComponent from "./components/redis.component";
import appConfig from "./configs/app.config";
import databaseConfig from "./configs/database.config";
import { DatabaseModule } from "./database/database.module";
import { AllExceptionFilter } from "./filter/exception.filter";
import { LoggerModule } from "./logger/logger.module";
import { DictionaryModule } from "./modules/dictionary/dictionary.module";
import {
  NotificationModule,
} from "./modules/push-notification/notification.module";
import { AudioConsumer } from "./modules/queue/audio.consumer";
import { MessagingService } from "./modules/rmq/message.service";
import { SettingsModule } from "./modules/settings/settings.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
        }),
        SentryModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (cfg: ConfigService) => ({
                dsn: cfg.get("SENTRY_DSN"),
                debug: true,
                environment: "dev",
                //   release: 'some_release', | null, // must create a release in sentry.io dashboard
                logLevel: 3 //based on sentry.io sublevel //
            }),
            inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                console.log("Debug", configService.get("redisUri"));
                return {
                    config: {
                        url: configService.get("redisUri"),
                    },
                };
            },
            inject: [ConfigService]
        }),
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: (configService: ConfigService) => ({
                uri: configService.get("rabbitmqUri"),
                exchanges: [
                    {
                        name: "exchange2",
                        type: "direct",
                    },
                    {
                        name: "exchange3",
                        type: "direct",
                    },
                ],
            }),
            inject: [ConfigService],
        }),
        BullModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                redis: Object.assign(
                    {},
                    parseRedisUrl(configService.get("redisUri")) || {},
                ),
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: "audio",
        }),
        LoggerModule,
        UserModule,
        DatabaseModule,
        DictionaryModule,
        NotificationModule,
        SettingsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        MessagingService,
        AudioConsumer,
        MessageComponent,
        Reflector,
        RedisComponent
    ],
})

export class AppModule {

}
