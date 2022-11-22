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
import { PostService } from "../post/post.service";
import { UserService } from "../user/user.service";
import { PostSaveController } from "./postSave.controller";
import PostSaveRepository from "./PostSave.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([PostSave, PostSaveRepository, User, Auth, Posts]),
    ],
    providers: [MessageComponent, ApiResponseService, UserService, ComponentService, AuthServices, PostService],
    exports: [TypeOrmModule],
    controllers: [PostSaveController],
})

export class PostSaveModule {

}