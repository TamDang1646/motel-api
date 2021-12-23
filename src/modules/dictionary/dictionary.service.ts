import { MessageComponent } from "src/components/message.component";
import RedisComponent from "src/components/redis.component";
import { EntityManager } from "typeorm";
import { v1 } from "uuid";

import { Injectable } from "@nestjs/common";

@Injectable()
export class DictionaryService {
    static CACHE_TIME = 1 * 60 * 60;//1 hour
    private readonly dictionary = [
    ]
    private readonly enumData = [
    ]
    private readonly enumNames = [
    ]
    constructor(
        private readonly entityManager: EntityManager,
        private readonly redis: RedisComponent,
        private readonly il8n: MessageComponent
    ) { }

    /**
     * @param {string} lang 
     * @returns 
     */
    async getDictionary(lang: string): Promise<Record<string, unknown>> {
        const data = {}
        const clientCode = await this.redis.getJson("static-data-key")
        const serverCode = await this.redis.getJson("static-data-key-server")

        if (clientCode <= serverCode) {
            let obj: Record<string, unknown> = await this.redis.getJson("static-data-obj");
            if (obj) {
                return obj;
            }
        }
        await Promise.all(this.dictionary.map(async entry => {
            // console.log("Debug", entry);
            return data[entry.name] = await this.entityManager.find(entry)
        }))

        //insert enum data
        for (let index = 0; index < this.enumNames.length; index++) {
            data[this.enumNames[index]] = await this.enumToObject(this.enumData[index], lang);
        }

        await this.redis.setJson("static-data-obj", data, DictionaryService.CACHE_TIME)
        const code = v1()
        await this.redis.setJson("static-data-key", code, DictionaryService.CACHE_TIME)
        await this.redis.setJson("static-data-key-server", code, DictionaryService.CACHE_TIME)

        return data
    }

    /**
     * @returns 
     */
    async bumpStaticDataKey(): Promise<string> {
        const code = v1()
        await this.redis.setJson("static-data-key", code, DictionaryService.CACHE_TIME)
        return code
    }

    /**
     * @param {unknown} e 
     * @param {string} lang 
     * @returns 
     */
    async enumToObject(e: any, lang: string) {
        const arrayObjects = [];
        for (const [propertyKey, propertyValue] of Object.entries(e)) {
            if (!Number.isNaN(Number(propertyKey))) {
                continue;
            }
            arrayObjects.push({ id: propertyValue, name: this.il8n.lang(propertyKey, lang) });
        }
        return arrayObjects;
    }
}

