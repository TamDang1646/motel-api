import Request from "fastify";

import {
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AppService } from "./app.service";
import { Shift } from "./dtos/Shift.dto";
import { BaseError } from "./exceptions/errors/base.error";
import { DatabaseError } from "./exceptions/errors/database.error";
import { ValidateError } from "./exceptions/errors/validate.error";
import {
  bitCount,
  convertToBinary,
  startTimeOfDay,
} from "./utils/general.util";
import { RolesGuard } from "./validators/roles.guard";

@Controller()
@UseGuards(RolesGuard)
export class AppController {
    constructor(
        private readonly appService: AppService,
        // private readonly amqpConnection: AmqpConnection,
        // @InjectQueue("audio") private audioQueue: Queue,
        // private fjobItemService: FjobItemService,
        // private i18n: MessageComponent
    ) { }

    @Get("profile")
    async getHello(@Req() request: Request): Promise<string> {
        // await this.walletService.addMoney(11, 1, 10)
        // await this.walletService.subMoney(11, 100)
        // const { rLat, rLon } = getRateLatLon(new Point({ latitude: 52.528611, longitude: 13.408056 }), 5000)

        // let ar = findARound(new Point({ latitude: 21.014399077613056, longitude: 105.83696591213305 }), 500)

        // const dis = getDistance(
        //     { latitude: 21.014399077613056, longitude: 105.8369659121330 },
        //     { latitude: 21.005415924771864, longitude: 105.82734272428753 }, 1
        // );

        // const dis1 = getDistance(
        //     { latitude: 21.014399077613056, longitude: 105.8369659121330 },
        //     { latitude: 21.023382230454256, longitude: 105.84658909997859 }, 1
        // );

        // console.log("Debug", dis, dis1, rLat, rLon, ar)
        // try {
        //     throw new ValidateError("khuy7en", "ly do day", 1100)
        // } catch (e) {
        //     if (e instanceof ValidateError) {
        //         throw new BadRequestException(
        //             {
        //                 message: e.getMessage(),
        //                 cause: e.getCause() || "",
        //                 errorCode: e.getErrorCode() || 9000
        //             }
        //         )
        //     }

        // }

        // console.log("Debug", a)
        // void await this.amqpConnection.publish("exchange2", "subscribe-route1", { msg: "hello world" });
        // void await this.amqpConnection.publish("exchange3", "subscribe-route2", { msg: "hello world 1" });

        // console.log("Debug", this.i18n.lang("ID_NOT_EXIST", "en"));

        // void await this.audioQueue.add({
        //     foo: "bar",
        // });

        console.log(startTimeOfDay())
        console.log(startTimeOfDay(false))

        return JSON.stringify([this.appService.getHello(), request.headers]);
    }

    @Get("exceptions")
    async TestException(@Req() request: Request): Promise<string> {
        try {
            throw new ValidateError("validate", "fdf", 400)
            // throwError<ValidateError>("database", "fdf", 400)
        } catch (e) {
            if (e instanceof ValidateError) {
                console.log("ValidateError", e)
            } else if (e instanceof DatabaseError) {
                console.log("DatabaseError", e);
            } else if (e instanceof BaseError) {
                console.log("BaseError", e);
            }
        }

        return "test"
    }

    @Get("test")
    async test(): Promise<unknown> {
        const a = convertToBinary([
            new Shift({ timeFrom: 1, timeTo: 10 }),
            new Shift({ timeFrom: 10.5, timeTo: 14.3 })
        ])
        console.log("Debug", a, bitCount(a));
        // let test = await this.fjobItemService.pickAGiftFromStock("CGV")
        // console.log("Debug", test);
        return { message: "Request Succeed!" };
    }

    @Get("healthz")
    selfCheck(): unknown {
        return { message: "Request Succeed!" };
    }
}
