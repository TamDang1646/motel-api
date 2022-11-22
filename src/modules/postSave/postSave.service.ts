import { BaseService } from "src/base/base.service";
import { Posts } from "src/entities/Posts.entity";
import { PostSave } from "src/entities/PostSave.entity";
import { LoggerService } from "src/logger/custom.logger";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import PostSaveRepository from "./PostSave.repository";

@Injectable()
export class PostSaveService extends BaseService<PostSave, PostSaveRepository> {
    constructor(
        @InjectRepository(Posts)
        protected readonly repository: PostSaveRepository,
        protected readonly logger: LoggerService,
    ) {
        super(repository, logger)
    }
}