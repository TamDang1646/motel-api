import { Property } from "src/utils/general.util";

import { BaseDto } from "../base/base.dto";

class Obj { }

export class Point extends BaseDto<Obj> {
    @Property()
    latitude: number;

    @Property()
    longitude: number;
}
