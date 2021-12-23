import {
  IsInt,
  IsString,
} from "class-validator";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class CallUpdateDto {
    @ApiProperty({
        default: "uuid",
        description: "Call uuid"
    })
    @IsString()
    @Property()
    uuid: string;

    @ApiProperty({
        default: 0,
        description: "user id"
    })
    @IsInt()
    @Property()
    userId: number

    @ApiProperty({
        default: 1,
        description: "0: hang up/reject, 1: accept/start call"
    })
    @IsInt()
    @Property()
    status: number

    @ApiProperty({
        default: 1,
        description: "must be 1"
    })
    @IsInt()
    @Property()
    type: number


}