import { IsString } from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Auth } from "src/entities/Auth.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateDto extends BaseDto<Auth> {
 
    @ApiProperty({
        description: "User's phone number"
    })
    // @IsString()
    @Property()
    @IsString()
    phoneNumber: string

    @ApiProperty({
        description: "User's pass"
    })
    // @IsString()
    @Property()
    @IsString()
    newPassword: string

    @ApiProperty({
        description: "User's pass"
    })
    // @IsString()
    @Property()
    @IsString()
    rePassword: string
}