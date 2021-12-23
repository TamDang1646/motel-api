import RedisComponent from "src/components/redis.component";
import { Token } from "src/decorators/token.decorator";
import { TokenDto } from "src/dtos/token.dto";

import {
  Controller,
  Get,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { DictionaryService } from "./dictionary.service";
import { Dictionary } from "./dto/dictionary.dto";
import { StaticDataKey } from "./dto/static-data-key.dto";

@ApiBearerAuth()
@ApiTags('Dictionarys')
@Controller("dictionary")
export class DictionaryController {
    constructor(
        private readonly dictionaryService: DictionaryService,
        private readonly redis: RedisComponent
    ) { }

    /**
     * Endpoint that returns the static data dictionary
     * @returns {Dictionary} The static data dictionary
     */
    @Get("init-data")
    @ApiResponse({
        status: 200,
        description: "The static data dictionary",
        type: Dictionary
    })
    async getDictionary(
        @Token() token: TokenDto
    ): Promise<Dictionary> {
        const data = await this.dictionaryService.getDictionary(token.lang)
        const code: string = await this.redis.getJson("static-data-key")

        return new Dictionary(code, data)
    }

    /**
     * Endpoint that checks if the static data is changed
     * @returns {StaticDataKey} The static data key which indicates if the static data dictionary has been changed
     */
    @Get("check-data-changed")
    @ApiResponse({
        status: 200,
        description: "The static data key which indicates if the static data dictionary has been changed",
        type: StaticDataKey
    })
    async checkData(): Promise<StaticDataKey> {
        const code: string = await this.redis.getJson("static-data-key")
        //     ?? await this.dictionaryService.bumpStaticDataKey()

        // Fix allway fresh
        // const code = await this.dictionaryService.bumpStaticDataKey()
        return new StaticDataKey(code)
    }

    //Force to invalidate dictionary data
    @Get("bump")
    async bumpStaticDataKey(): Promise<Record<string, unknown>> {
        return { data: await this.dictionaryService.bumpStaticDataKey() }
    }
}
