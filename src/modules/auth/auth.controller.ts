import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
import { ErrorCodes } from "src/constants/error-code.const";
import { Auth } from "src/entities/Auth.entity";
import { InvalidValueError } from "src/exceptions/errors/invalid-value.error";
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

    @Get("/all")
    async test(): Promise<Auth[]> {
        try {
            return await this.authService.getAll()
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }


    @Post("/register")
    async register(
        @Body() createAuthBody: CreateAuthDto
    ): Promise<any> {
        let data = new Auth()
        let authRes
        let userRes
        let code = ""
        const phoneNumber = telephoneCheckAndGet(createAuthBody.phoneNumber)
        if (!phoneNumber) {
            throw new InvalidValueError(
                "INVALID_PHONE_NUMBER",
                "Invalid user phone",
                ErrorCodes.INVALID_PHONE_NUMBER)
        }
        if (createAuthBody.password != createAuthBody.rePassword) {
            throw new InvalidValueError(
                "PASSWORD_INCORRECT",
                "PASSWORD_INCORRECT",
                ErrorCodes.PASSWORD_INCORRECT)
        }
        const userTypeId = 1
        const shard = 511
        const sequenceId = Math.floor(Math.random() * 1024)
        code = generateId(userTypeId, Date.now(), shard, sequenceId)
        try {
            data.code = code
            data.phoneNumber = phoneNumber
            data.password = createAuthBody.rePassword
            authRes = await this.authService.createUser(data)
        } catch (err) {
            // since we have errors let's rollback changes we made
            this.throwErrorProcess(err)
            return
        }
        try {
            const auth = await this.authService.getAuth(authRes.id)
            let newData = new CreateUserDto()
            newData.id = auth.id
            newData.code = auth.code
            newData.phoneNumber = auth.phoneNumber
            userRes = await this.userService.createUser(newData)
            return userRes 
        } catch (error) {
            this.authService.delete(authRes.id)
            this.userService.delete(userRes.id)
            this.throwErrorProcess(error)
            return
        }
    }
}
