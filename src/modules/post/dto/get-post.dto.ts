import {
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Posts } from "src/entities/Posts.entity";
import { User } from "src/entities/User.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class GetPostDto extends BaseDto<Posts>{
    @ApiProperty({
        description: "Post's id",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    id: number

    @ApiProperty({
        description: "Post's author",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    authorId: number

    @ApiProperty({
        description: "Post's title",
        required: false

    })
    // @IsString()
    @IsOptional()
    @Property()
    @IsString()
    title: string

    @ApiProperty({
        description: "Post's price",
        required: false
    })
    // @IsString()
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
        description: "Post's address",
        required: false

    })
    // @IsString()
    @Property()
    @IsOptional()
    @IsString()
    address: string

    @ApiProperty({
        description: "Post's postType",
        required: false,
        default: 0
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    postType: number

    @ApiProperty({
        description: "Post's status",
        required: false,
        default: 0

    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    status: number


}
export class GetPostEXDto extends GetPostDto {
    @ApiProperty({
        description: "Post's id",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    id: number

    @ApiProperty({
        description: "Post's author",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    authorId: number

    @ApiProperty({
        description: "Post's title",
        required: false

    })
    // @IsString()
    @IsOptional()
    @Property()
    @IsString()
    title: string

    @ApiProperty({
        description: "Post's price",
        required: false
    })
    // @IsString()
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
        description: "Post's address",
        required: false

    })
    // @IsString()
    @Property()
    @IsOptional()
    @IsString()
    address: string

    @ApiProperty({
        description: "Post's postType",
        required: false,
        default: 0
    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    postType: number

    @ApiProperty({
        description: "Post's status",
        required: false,
        default: 0

    })
    // @IsString()
    @Property()
    @IsOptional()
    // @IsNumber()
    status: number
}

export class AuthorDto extends BaseDto<User>{
    @Property()
    id: number

    @Property()
    code: string

    @Property()
    phoneNumber: string

    @Property()
    email: string

    @Property()
    name: string

    @Property()
    birthday: string

    @Property()
    avatar: string

    @Property()
    address: string

    @Property()
    totalPost: number
}