import {
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ErrorCodes } from "src/constants/error-code.const";
import { ServiceCallError } from "src/exceptions/errors/service.call.error";

import {
  Injectable,
  NestMiddleware,
} from "@nestjs/common";

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
    use(req: FastifyRequest, res: FastifyReply, next: (error?: Error) => void): void {
        try {
            if (
                (req.headers["x-role"] == "user"
                    || req.headers["x-role"] == "service")
                && (req.headers["x-user-id"])
                && (req.headers["x-user-code"])
            ) next()
            else throw new ServiceCallError(
                "INVALID_HEADERS",
                "Invalid Request Headers",
                ErrorCodes.INVALID_HEADERS
            )
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}