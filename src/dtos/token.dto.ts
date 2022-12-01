import { IsOptional } from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Token } from "src/entities/Token.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class TokenDto extends BaseDto<Token>{
    @ApiProperty({
        description: "Post's id",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    userId: number

    @ApiProperty({
        description: "Post's author",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    code: string

}
