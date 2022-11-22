import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  APP_FILTER,
  Reflector,
} from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageComponent } from "./components/message.component";
import appConfig from "./configs/app.config";
import databaseConfig from "./configs/database.config";
import { DatabaseModule } from "./database/database.module";
import { AllExceptionFilter } from "./filter/exception.filter";
import { LoggerModule } from "./logger/logger.module";
import { AuthModule } from "./modules/auth/auth.module";
import { PostModule } from "./modules/post/post.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
        }),
        LoggerModule,
        DatabaseModule,
        AuthModule,
        UserModule,
        PostModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        MessageComponent,
        Reflector,
    ],
})

export class AppModule {

}
