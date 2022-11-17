import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
import { User } from "src/entities/User.entity";

import {
  Controller,
  Get,
  Param,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

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
}