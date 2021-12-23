import { IsString } from "class-validator";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class VoIPTokenDto {
    @ApiProperty({
        default: "token",
        description: "voip device token"
    })
    @IsString()
    @Property()
    token: string
}