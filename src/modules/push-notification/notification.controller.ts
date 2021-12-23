import { MessageComponent } from "src/components/message.component";
import { ErrorCodes } from "src/constants/error-code.const";
import { Token } from "src/decorators/token.decorator";
import { TokenDto } from "src/dtos/token.dto";
import { Platform } from "src/enums/app.enum";
import { ValidateError } from "src/exceptions/errors/validate.error";
import { v1 } from "uuid";

import {
  Body,
  Controller,
  Post,
  SetMetadata,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { CallDataDto } from "./dto/call-data.dto";
import { CallUpdateDto } from "./dto/call-update.dto";
import { VoIPTokenDto } from "./dto/voip-token.dto";
import { NotificationService } from "./notification.service";

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notification')
export class NotificationController {
    constructor(
        private readonly configService: ConfigService,
        // private readonly userService: UserService,
        private readonly notificationService: NotificationService,
        private messageComponent: MessageComponent) { }

    @Post("/register-voip-token")
    @SetMetadata("roles", ["user", "service"])
    async registerVoIPToken(
        @Body() tokenData: VoIPTokenDto,
        @Token() token: TokenDto
    ) {
        console.log("/register-voip-token", tokenData);
        return await this.notificationService.registerVoIPDeviceToken(token.userId, tokenData.token);
    }

    @Post("/make-call")
    @SetMetadata("roles", ["user", "service"])
    async makeCall(
        @Body() callData: CallDataDto,
        @Token() token: TokenDto
    ) {
        if (!callData.uuid) {
            callData.uuid = v1();
        }
        //Should check for callerId and calleeId
        if (callData.calleeId == token.userId) {
            throw new ValidateError(
                "CANT_CALL_YOURSELF",
                "Can't call yourself",
                ErrorCodes.CANT_CALL_YOURSELF
            )
        }
        // const user = await this.userService.findById(token.userId);
        //Send to ios voip
        const iosPush = await this.notificationService.sendVoIPPush(callData.calleeId, callData);
        console.log("voip push:", callData, iosPush);
        //Send data push to android
        if (iosPush.recipients && iosPush.recipients > 0) {
            return { ...callData, pushResult: iosPush };
        }
        const androidPush = await this.notificationService.sendDataPush(callData.calleeId, callData, Platform.Android);
        console.log("android push:", callData, androidPush);
        if (androidPush.recipients && androidPush.recipients > 0) {
            return { ...callData, pushResult: androidPush };
        }
        else {
            throw new ValidateError(
                "CANT_CALL_USER_NOT_AVAILABLE",
                "Can't make call, user is not available!",
                ErrorCodes.CANT_CALL_USER_NOT_AVAILABLE
            )
        }
    }

    @Post("/update-call")
    @SetMetadata("roles", ["user", "service"])
    async updateCall(
        @Body() callData: CallUpdateDto,
        @Token() token: TokenDto
    ) {
        if (!callData.uuid) {
            callData.uuid = v1();
        }
        //Should check for callerId and calleeId
        console.log("/update-call", callData);
        // const user = await this.userService.findById(token.userId);
        //Send to ios voip
        //Send data push to android
        const androidPush = await this.notificationService.sendDataPush(callData.userId, null, Platform.Android);
        const iosPush = await this.notificationService.sendDataPush(callData.userId, null, Platform.Ios);
        return androidPush;
    }
}
