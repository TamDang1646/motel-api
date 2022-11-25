import { BaseController } from "src/base/base.controller";
import ComponentService from "src/components/component";
import { MessageComponent } from "src/components/message.component";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import {
  GetSaveDto,
  SaveDto,
} from "./dto/save.dto";
import { PostSaveService } from "./postSave.service";

@ApiBearerAuth()
@ApiTags('Post save')
@Controller("save")
export class PostSaveController extends BaseController {

    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService,
        private readonly saveService: PostSaveService,
        private readonly configService: ConfigService,
        private readonly component: ComponentService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    @Get("/:id")
    async getSaveForUser(
        // @Query() token: TokenDto,
        @Param("id") id: number,
    ): Promise<any> {
        try {
            return await this.saveService.getSaveForUser(id)
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }

    /**
     * 
     * @param param 
     * @returns 
     */
    @Get()
    async getSave(
        // @Query() token: TokenDto,
        @Query() param: GetSaveDto,
    ): Promise<any> {
        try {
            return await this.saveService.getSave(param.userId, param.postId)
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }
    /**
     * 
     * @param params 
     * @returns 
     */
    @Post()
    async savePost(
        @Body() param: SaveDto,
    ): Promise<any> {
        try {
            const res = await this.saveService.savePost(param.postId, param.userId)
            if (res) {
                return {
                    message: "Lưu thành công",
                }
            }
        }
        catch (error) {
            this.throwErrorProcess(error)
        }
    }


    @Delete("/:postId/:userId")
    async deleteSave(
        // @Query() param: SaveDto,
        @Param("postId") postId: number,
        @Param("userId") userId: number,

    ): Promise<any> {
        console.log("param", postId, userId);

        try {
            const res = await this.saveService.deleteSave(postId, userId)
            if (res) {
                return {
                    message: "Huỷ lưu thành công",
                }
            }
        }
        catch (error) {
            this.throwErrorProcess(error)
        }
    }
}