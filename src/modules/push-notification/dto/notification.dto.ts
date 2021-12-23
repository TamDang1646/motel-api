import { Type } from "class-transformer";
import {
  IsJSON,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class ContentsDto {
    @ApiProperty({
        description: "Notification message in English",
        example: "The Industrial Revolution and its consequences have been a disaster for the human race."
    })
    @IsString()
    en: string

    @ApiProperty({
        description: "Notification message in Vietnamese",
        example: "Cuộc Cách mạng Công nghiệp và hậu quả của nó là một thảm họa đối với loài người."
    })
    @IsString()
    vi: string

    @ApiProperty({
        description: "extra data",
        required: false,
        example: "{isVip: true}"
    })
    @IsJSON()
    data: JSON;
}

export class NotifcationDto {
    @ApiProperty({
        description: "Segments those will be notified",
        required: false,
        example: ["Subscribed Users"]
    })
    @IsOptional()
    @IsString({
        each: true
    })
    includedSegments: string[]

    @ApiProperty({
        description: "Players those will be notified",
        required: false,
        example: ["86e0b5ee-9d3a-4b94-a4d1-3981894e041a"]
    })
    @IsOptional()
    @IsUUID("4", { each: true })
    includedPlayerIds: string[]

    @ApiProperty({
        description: "Internal users those will be notified",
        required: false,
        example: ["1", "2"]
    })
    @IsOptional()
    includedExternaluserIds: string[]


    @ApiProperty({
        description: "Content of the notification",
    })
    @ValidateNested()
    @Type(() => ContentsDto)
    contents: ContentsDto
}

