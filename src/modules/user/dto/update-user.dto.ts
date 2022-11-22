import {
  IsNumber,
  IsOptional,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export default class UpdateUserDto extends BaseDto<User> {

    @ApiProperty({
        required: true,
        description: "User's id"
    })
    @IsOptional()
    @IsNumber()
    @Property()
    id: number

    @ApiProperty({
        default: null,
        required: false,
        description: "User's email"
    })
    @IsOptional()
    @Property()
    email: string

    @ApiProperty({
        default: "New User",
        required: false,
        description: "User's name"
    })
    @IsOptional()
    @Property()
    name: string

    @ApiProperty({
        default: 0,
        required: false,
        description: "User's name"
    })
    @IsOptional()
    @IsNumber()
    @Property()
    gender: number

    @ApiProperty({
        default: null,
        required: false,
        description: "User's birthday"
    })
    @IsOptional()
    @Property()
    birthday: string

    @ApiProperty({
        default: null,
        required: false,
        description: "User's avatar"
    })
    @IsOptional()
    @Property()
    avatar: string

    @ApiProperty({
        default: null,
        required: false,
        description: "User's address"
    })
    @IsOptional()
    @Property()
    address: string
};
