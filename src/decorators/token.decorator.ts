import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const headers = request.headers as unknown as Record<string, unknown>

        // return new TokenDto({
        //     userId: headers["x-user-id"] ? parseInt(headers["x-user-id"] as string) : 0,
        //     userCode: headers["x-user-code"] ?? "",
        //     // role: headers["x-role"] ?? "",
        //     // lang: headers["x-lang"] ?? "vi",
        //     // apiKey: headers["x-pai-key"] ?? "",
        // });
    },
);