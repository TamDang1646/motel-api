import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get<string[]>("roles", context.getHandler());

        const role = (request.headers["x-role"])
            ? request.headers["x-role"] as string
            : null;

        const userId = (request.headers["x-user-id"])
            ? request.headers["x-user-id"] as number
            : null;

        const userCode = (request.headers["x-user-code"])
            ? request.headers["x-user-code"] as string
            : null;

        if (roles) {
            if (!userId || !userCode || !roles.includes(role)) {
                return false
            }
            return true
        }

        return true;
    }
}
