import { AuthServices } from "src/modules/auth/auth.service";
import { UserService } from "src/modules/user/user.service";

import { Injectable } from "@nestjs/common";

import { MessageComponent } from "./message.component";

@Injectable()
export default class ComponentService {

    constructor(
        private readonly authService: AuthServices,
        private readonly userService: UserService,
        private i18n: MessageComponent,
    ) { }

    async checkPhoneExist(phoneNumber: string) {
        return this.authService.getAuthByPhone(phoneNumber)
    }

    async setExtraData(data) {
        data.author = await this.userService.getUserById(data.authorId)
    }
}