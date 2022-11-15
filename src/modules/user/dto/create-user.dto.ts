import {
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { User } from "src/entities/User";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends BaseDto<User> {

    @ApiProperty({
        description: "User's id"
    })
    @IsNumber()
    @Property()
    userId: number

    @ApiProperty({
        default: "dnYUBEand",
        description: "User's generated code"
    })
    @IsString()
    @Property()
    code: string

    @ApiProperty({
        description: "User's phone number"
    })
    @IsString()
    @Property()
    phoneNumber: string

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
        default: "vi",
        required: false,
        description: "language"
    })
    @IsOptional()
    @Property()
    language: string
    
    @ApiProperty({
        default: 0,
        required: false,
        description: "User's name"
    })
    @IsOptional()
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
    
}
