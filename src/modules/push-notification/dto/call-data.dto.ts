import {
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { Property } from "src/utils/general.util";

import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CallDataDto {
    @ApiProperty({
        default: "uuid",
        description: "Call uuid"
    })
    @IsOptional()
    @IsString()
    @Property()
    uuid: string;

    @ApiProperty({
        default: 0,
        description: "callee id"
    })
    @IsInt()
    @Property()
    calleeId: number

    @ApiProperty({
        default: 0,
        description: "caller id"
    })
    @IsInt()
    @Property()
    callerId: number

    @ApiProperty({
        default: "callerName",
        description: "callerName"
    })
    @IsString()
    @Property()
    callerName: string

    @ApiProperty({
        default: "callerAvatar",
        description: "callerAvatar"
    })
    @Optional()
    @IsString()
    @Property()
    callerAvatar: string

    @ApiProperty({
        default: "handle",
        description: "handle"
    })
    @IsString()
    @Property()
    handle: string

    @ApiProperty({
        default: "channelName",
        description: "channelName"
    })
    @IsString()
    @Property()
    channelName: string

}