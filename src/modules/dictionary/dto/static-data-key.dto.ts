import { ApiProperty } from "@nestjs/swagger";

export class StaticDataKey {
    @ApiProperty({
        description: "The static data key",
        example: "a6238d80-c8d1-11eb-9463-dfcc39948540"
    })
    data: string

    constructor(code: string) {
        this.data = code
    }
}