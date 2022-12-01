import {
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Posts } from "src/entities/Posts.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto extends BaseDto<Posts>{
    @ApiProperty({
        description: "Post's author",
        required: true
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    authorId: number

    @ApiProperty({
        description: "Post's title",
        required: true

    })
    // @IsString()
    @IsOptional()
    @Property()
    @IsString()
    title: string

    @ApiProperty({
        description: "Post's title",
        required: true

    })
    // @IsString()
    @IsOptional()
    @Property()
    @IsString()
    detail: string


    @ApiProperty({
        description: "Post's price",
        required: true
    })
    // @IsNumber()
    @Property()
    @IsOptional()
    price: number

    @ApiProperty({
        description: "Post's price",
        required: false
    })
    // @IsNumber()
    @Property()
    @IsOptional()
    minPrice: number

    @ApiProperty({
        description: "Post's price",
        required: false
    })
    // @IsNumber()
    @Property()
    @IsOptional()
    maxPrice: number

    @ApiProperty({
        description: "Post's time_unit",
        required: true
    })
    // @IsNumber()
    @Property()
    @IsOptional()
    time_unit: number

    @ApiProperty({
        description: "Post's address",
        required: true

    })
    // @IsString()
    @Property()
    @IsOptional()
    @IsString()
    address: string

    @ApiProperty({
        description: "Post's postType",
        required: true,
        default: 0
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    postType: number

    @ApiProperty({
        description: "Post's image",
        required: false,
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    image: string


}