import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
import { telephoneCheckAndGet } from "src/utils/general.util";
import { generateId } from "src/utils/id-generator.util";
import { DataSource } from "typeorm";

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

import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
import { AuthServices } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@ApiBearerAuth()
@ApiTags('Auths')
@Controller("auth")
export class AuthController extends BaseController {
    constructor(
        private readonly authService: AuthServices,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        protected readonly dataSource: DataSource,
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
        let code = ""
        const phoneNumber = telephoneCheckAndGet(createAuthBody.phoneNumber)
        console.log("data",phoneNumber);
        data = {}
        const userTypeId = 1
        const shard = 511
        const sequenceId = Math.floor(Math.random() * 1024)
        code = generateId(userTypeId, Date.now(), shard, sequenceId)
        try {
            let use
            data.code = code
            data.phoneNumber = phoneNumber
            data.password = createAuthBody.rePassword
            const res = await this.authService.save(data)
            console.log("res",res);
            if (res) {
                let newData: CreateUserDto
                newData.userId = res.id
                newData.code = res.code
                newData.phoneNumber = res.phoneNumber
                const res2 = await this.userService.createUser(newData)
                return res2 
            } else {
                this.authService.delete(res.id)
            }
        } catch (err) {
            // since we have errors let's rollback changes we made
            
        }
    }
}
