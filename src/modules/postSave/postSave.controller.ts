import { BaseController } from "src/base/base.controller";
import ComponentService from "src/components/component";
import { MessageComponent } from "src/components/message.component";

import {
  Controller,
  Post,
  Query,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { PostService } from "../post/post.service";
import { UserService } from "../user/user.service";
import { SaveDto } from "./dto/save.dto";

@ApiBearerAuth()
@ApiTags('Post save')
@Controller("save")
export class PostSaveController extends BaseController {

    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService,
        private readonly configService: ConfigService,
        private readonly component: ComponentService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    @Post()
    async savePost(
        @Query() params: SaveDto
    ): Promise<any> {
        return params
    }
}