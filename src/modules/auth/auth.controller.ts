import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
import { telephoneCheckAndGet } from "src/utils/general.util";

import {
  Body,
  Controller,
  Get,
  Post,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { CreateAuthDto } from "./dto/create-auth.dto";

@ApiBearerAuth()
@ApiTags('Auths')
@Controller("auth")
export class AuthController extends BaseController {
    constructor(
        private readonly configService: ConfigService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    @Get("/test")
    async test(): Promise<string> {
        return "test"
    }


    @Post("/register")
    async register(
        @Body() createAuthBody: CreateAuthDto
    ): Promise<any> {

        let data
        
        try {
            const phoneNumber = telephoneCheckAndGet(createAuthBody.phoneNumber)
            console.log("data",phoneNumber);
            data = {phoneNumber}
        } catch (error) {
            
            console.log("err",error);
        }
        return data
    }
}
