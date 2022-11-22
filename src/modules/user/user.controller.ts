import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
import { ErrorCodes } from "src/constants/error-code.const";
import { User } from "src/entities/User.entity";
import { InvalidValueError } from "src/exceptions/errors/invalid-value.error";

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import UpdateUserDto from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiBearerAuth()
@ApiTags('Users')
@Controller("user")
export class UserController extends BaseController {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    @Get("/all")
    async getAll(): Promise<User[]> {
        try {
            return await this.userService.getAll()
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }

    @Get("/:id")
    async getUserById(
        @Param("id") id: number
    ): Promise<User> {
        try {
            return await this.userService.getUserById(id)
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }

    @Get("/code/:code")
    async getUserByCode(
        @Param("code") code: string
    ) {
        try {
            return await this.userService.getUser(code)
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }


    @Patch("/update")
    async updateUser(
        @Body() updateParams: UpdateUserDto
    ): Promise<User> {

        let user = await this.userService.getUserById(updateParams.id)
        if (!user) {
            throw new InvalidValueError(
                "USER_NOT_EXIST",
                "USER_NOT_EXIST",
                ErrorCodes.USER_NOT_EXIST)
        }

        try {
            return await this.userService.updateUserById(user.id, updateParams as unknown as Record<string, unknown>)
        } catch (error) {
            this.throwErrorProcess(error)
        }
        return user
    }
}