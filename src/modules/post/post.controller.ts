import { PaginatedDto } from "src/api-response/api-response.dto";
import { BaseController } from "src/base/base.controller";
import { iPaginationOption } from "src/base/pagination.dto";
import ComponentService from "src/components/component";
import { MessageComponent } from "src/components/message.component";
import { ErrorCodes } from "src/constants/error-code.const";
import { TokenDto } from "src/dtos/token.dto";
import { Posts } from "src/entities/Posts.entity";
import { InvalidValueError } from "src/exceptions/errors/invalid-value.error";

import {
  Body,
  Controller,
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

import { UserService } from "../user/user.service";
import { CreatePostDto } from "./dto/create-post.dto";
import {
  GetPostDto,
  GetPostEXDto,
} from "./dto/get-post.dto";
import { PostService } from "./post.service";

@ApiBearerAuth()
@ApiTags('Post')
@Controller("post")
export class PostController extends BaseController {

    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService,
        private readonly configService: ConfigService,
        private readonly component: ComponentService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }

    @Get()
    async findPost(
        @Query() token: TokenDto,
        @Query() paging: iPaginationOption,
        @Query() searchPost: GetPostDto,
    ): Promise<any> {
        console.log("params: ", token);
        if (!token.code || !token) {
            throw new InvalidValueError(
                "INVALID_USER_CODE_AND_ID",
                "USER_NOT_EXIST",
                ErrorCodes.INVALID_USER_CODE)
        }
        try {
            const postData = await this.postService.find(searchPost, paging)
            const getPostData = postData as unknown as PaginatedDto<GetPostEXDto>
            for (const rs of getPostData.data) {
                // Get more company address data
                await this.component.setExtraData(rs, token)
            }
            return getPostData
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }

    @Get("/save-post/:id")
    async getSavePost(
        @Param("id") id: number,
        @Query() paging: iPaginationOption,
    ): Promise<any> {
        try {
            let token = new TokenDto
            token.userId = id
            const res = await this.postService.getUserSavePost(id, paging)
            const getPostData = res as unknown as PaginatedDto<GetPostEXDto>
            for (const rs of getPostData.data) {
                // Get more company address data
                await this.component.setExtraData(rs, token)
            }
            return getPostData
            // return res.map((item) => ({ ...item, isSave: 1 }))
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }


    @Post()
    async createPost(
        @Body() postData: CreatePostDto
    ): Promise<Posts> {
        console.log("postData", postData);

        let user = await this.userService.getUserById(postData.authorId)
        if (!user) {
            throw new InvalidValueError(
                "USER_NOT_EXIST",
                "USER_NOT_EXIST",
                ErrorCodes.INVALID_USER_CODE)
        }
        try {

            const res = await this.postService.createPost(postData)
            if (res) {
                await this.userService.updateTotalPost(postData.authorId)
            }
            return res
        } catch (error) {
            this.throwErrorProcess(error)
        }
    }

}