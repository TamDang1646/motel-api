import { IsString } from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Auth } from "src/entities/Auth.entity";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class GetAuthDto extends BaseDto<Auth> {
 
      @ApiProperty({
          description: "User's id"
      })
      // @IsString()
      @Property()
      @IsString()
      id: number
    
      @ApiProperty({
          description: "User's code"
      })
      // @IsString()
      @Property()
      @IsString()
      code: string
    
      @ApiProperty({
          description: "User's phone number"
      })
      // @IsString()
      @Property()
      @IsString()
      phoneNumber: string
    
      @ApiProperty({
          description: "User's language"
      })
      // @IsString()
      @Property()
      @IsString()
      language: string
    
  }
  