import { BaseController } from "src/base/base.controller";
import ComponentService from "src/components/component";
import { MessageComponent } from "src/components/message.component";
import { ErrorCodes } from "src/constants/error-code.const";
import { Auth } from "src/entities/Auth.entity";
import { User } from "src/entities/User.entity";
import { InvalidValueError } from "src/exceptions/errors/invalid-value.error";
import { telephoneCheckAndGet } from "src/utils/general.util";
import { generateId } from "src/utils/id-generator.util";
import { DataSource } from "typeorm";

import {
  Body,
  Controller,
  Get,
  Patch,
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
import { LoginDto } from "./dto/login.dto";
import { UpdateDto } from "./dto/update.dto";

@ApiBearerAuth()
@ApiTags('Auths')
@Controller("auth")
export class AuthController extends BaseController {
    constructor(
        private readonly authService: AuthServices,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        protected readonly dataSource: DataSource,
        private readonly componentService: ComponentService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    /**
     * 
     * @returns 
     */
    @Get("/all")
    async test(): Promise<Auth[]> {
        try {
            return await this.authService.getAll()
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }


    /**
     * 
     * @param createAuthBody 
     * @returns 
     */
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

    /**
     * 
     * @param loginParams 
     * @returns 
     */
    @Post("/login")
    async login(
        @Body() loginParams: LoginDto
    ): Promise<User>{
        console.log("body: ", loginParams);
        let phoneNumber = telephoneCheckAndGet(loginParams.phoneNumber)
        if (!phoneNumber) {
            throw new InvalidValueError(
                "INVALID_PHONE_NUMBER",
                "Invalid user phone",
                ErrorCodes.INVALID_PHONE_NUMBER)
        }
        let authData
        let userData
        authData = await this.componentService.checkPhoneExist(phoneNumber)
        if (authData && authData.password !== loginParams.password) { 
            throw new InvalidValueError(
                "PASSWORD_INCORRECT",
                "PASSWORD_INCORRECT",
                ErrorCodes.PASSWORD_INCORRECT)
        }
        if (authData) {
            userData = await this.userService.getUser(authData.code, true)
        } else { 
            throw new InvalidValueError(
                "USER_NOT_EXIST",
                "USER_NOT_EXIST",
                ErrorCodes.USER_NOT_EXIST)
        }
        if (!userData) {
            throw new InvalidValueError(
                "USER_NOT_EXIST",
                "USER_NOT_EXIST",
                ErrorCodes.USER_NOT_EXIST)
        }
        return userData
    }


    @Patch("/update")
    async updateAuth(
        @Body() updateParams: UpdateDto
    ): Promise<any>{
        let phoneNumber = telephoneCheckAndGet(updateParams.phoneNumber)
        if (!phoneNumber) {
            throw new InvalidValueError(
                "INVALID_PHONE_NUMBER",
                "Invalid user phone",
                ErrorCodes.INVALID_PHONE_NUMBER)
        }
        let authData
        let userData
        authData = await this.componentService.checkPhoneExist(phoneNumber)
        if (!authData) { 
            throw new InvalidValueError(
                "USER_NOT_EXIST",
                "USER_NOT_EXIST",
                ErrorCodes.USER_NOT_EXIST)
        }
        if (updateParams.newPassword != updateParams.rePassword) {
            throw new InvalidValueError(
                "NEW_PASSWORD_INCORRECT",
                "PASSWORD_INCORRECT",
                ErrorCodes.PASSWORD_INCORRECT)
        }
        try {
            await this.authService.updateAuth(authData.id,{password:updateParams.newPassword})
        } catch (error) {
            this.throwErrorProcess(error)
        }
        return {
            message: "Update password success"
        }
    }
}
