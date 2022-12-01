import { TokenDto } from "src/dtos/token.dto";
import { AuthServices } from "src/modules/auth/auth.service";
import { PostSaveService } from "src/modules/postSave/postSave.service";
import { UserService } from "src/modules/user/user.service";

import { Injectable } from "@nestjs/common";

import { MessageComponent } from "./message.component";

@Injectable()
export default class ComponentService {

    constructor(
        private readonly authService: AuthServices,
        private readonly userService: UserService,
        private readonly saveService: PostSaveService,
        private i18n: MessageComponent,
    ) { }

    async checkPhoneExist(phoneNumber: string) {
        return this.authService.getAuthByPhone(phoneNumber)
    }

    async setExtraData(data, token: TokenDto) {
        const isSave = await this.saveService.getSave(token.userId, data.id)
        data.author = await this.userService.getUserById(data.authorId)
        data.isSave = isSave ? 1 : 0
    }
}