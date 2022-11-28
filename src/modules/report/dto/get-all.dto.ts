import { IsOptional } from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Report } from "src/entities/Report.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class GetAllReports extends BaseDto<Report>{
    @ApiProperty({
        description: "UserId report",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    userReport: number

    @ApiProperty({
        description: "Reported Post Id",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    reportedPost: number

    @ApiProperty({
        description: "Reported User Id",
        required: false
    })
    // @IsString()
    @Property()
    @IsOptional()
    reportedUser: number
}