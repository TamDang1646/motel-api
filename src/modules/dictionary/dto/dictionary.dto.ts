import { ApiProperty } from "@nestjs/swagger";

export class Dictionary {
    @ApiProperty({
        description: "The static data key",
        example: "a6238d80-c8d1-11eb-9463-dfcc39948540"
    })
    code: string

    @ApiProperty({
        description: "The static data",
    })
    data: Record<string, unknown>

    constructor(code: string, data: Record<string, unknown>) {
        this.code = code
        this.data = data
    }
}