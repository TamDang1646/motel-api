import queryString from "query-string";
import { BaseService } from "src/base/base.service";
import { iPaginationOption } from "src/base/pagination.dto";
import { Posts } from "src/entities/Posts.entity";
import { LoggerService } from "src/logger/custom.logger";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { GetPostDto } from "./dto/get-post.dto";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService extends BaseService<Posts, PostRepository> {
    constructor(
        @InjectRepository(Posts)
        protected readonly repository: PostRepository,
        protected readonly logger: LoggerService,
    ) {
        super(repository, logger)
    }

    async find(params: GetPostDto, paging: iPaginationOption) {
        const postTable = this.repository.metadata.tableName
        const query = this.repository.manager.createQueryBuilder(Posts, postTable)
        // query.leftJoinAndMapMany("post.author", User, "user", "authorId = user.id")
        // query
        //     .innerJoin(
        //         "user",
        //         "user",
        //         "user.id = post.authorId",
        //     )
        // .addSelect("user", "author")
        if (params.id) {
            query.andWhere("id = :id", { id: params.id })
        }
        if (params.authorId) {
            query.andWhere("authorId = :authorId", { authorId: params.authorId })
        }
        if (params.title) {
            query.andWhere("title like :title", { title: `%${params.title}%` })
        }
        if (params.minPrice) {
            query.andWhere("price >= :minPrice", { minPrice: params.minPrice })
        }
        if (params.maxPrice) {
            query.andWhere("price <= :maxPrice", { maxPrice: params.maxPrice })
        }
        if (params.address) {
            query.andWhere("address like :address", { address: `%${params.address}%` })
        }
        if (params.postType) {
            query.andWhere("postType = :postType", { postType: params.postType })
        }
        if (params.status) {
            query.andWhere("status = :status", { status: params.status })
        }
        query.orderBy("id", "DESC")
        console.log("quey", await query.getQuery());

        // return await query.execute()
        return await this.iPaginateCustom<Posts>(
            query,
            paging.page as number,
            paging.limit as number,
            queryString.stringify({ ...params, ...paging })
        )
    }
}