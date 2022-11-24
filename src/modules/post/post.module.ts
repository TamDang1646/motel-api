import { ApiResponseService } from "src/api-response/api-response.service";
import ComponentService from "src/components/component";
import { MessageComponent } from "src/components/message.component";
import { Auth } from "src/entities/Auth.entity";
import { Posts } from "src/entities/Posts.entity";
import { PostSave } from "src/entities/PostSave.entity";
import { User } from "src/entities/User.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthServices } from "../auth/auth.service";
import { PostSaveService } from "../postSave/postSave.service";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts, PostRepository, User, Auth, PostSave]),
    ],
    providers: [PostService, MessageComponent, ApiResponseService, UserService, UserRepository, ComponentService, AuthServices, PostSaveService],
    exports: [TypeOrmModule],
    controllers: [PostController],
})

export class PostModule {

}