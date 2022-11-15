import { IsString } from "class-validator";
import { BaseDto } from "src/base/base.dto";
import { Auth } from "src/entities/Auth";
import { Property } from "src/utils/general.util";

import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto extends BaseDto<Auth> {
 
      @ApiProperty({
          description: "User's phone number"
      })
      // @IsString()
      @Property()
      @IsString()
      phoneNumber: string
  
      @ApiProperty({
          required: true,
          description: "User's password"
      })
      @Property()
      @IsString()
      password: string

      @ApiProperty({
          required: true,
          description: "User's re-password"
      })
      @Property()
      @IsString()
      rePassword: string
  }
  