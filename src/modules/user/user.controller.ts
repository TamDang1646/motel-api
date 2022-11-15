import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";

import {
  Controller,
  Get,
  Post,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { UserService } from "./user.service";

@ApiBearerAuth()
@ApiTags('Users')
@Controller("users")
export class UserController extends BaseController {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    @Get("/test")
    async test(): Promise<string> {
        return "test"
    }


    @Post("/login")
    async login(): Promise<any> {
        
    }
}
