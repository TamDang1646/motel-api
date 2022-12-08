import queryString from "query-string";
import { BaseService } from "src/base/base.service";
import { iPaginationOption } from "src/base/pagination.dto";
import { ErrorCodes } from "src/constants/error-code.const";
import { Posts } from "src/entities/Posts.entity";
import { PostSave } from "src/entities/PostSave.entity";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { LoggerService } from "src/logger/custom.logger";
import {
  InsertResult,
  QueryFailedError,
} from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreatePostDto } from "./dto/create-post.dto";
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

    async getUserSavePost(userId: number, paging: iPaginationOption) {
        const query = this.repository.manager.createQueryBuilder(Posts, "post")
            .select("post.*")
            .innerJoin(PostSave, "ps", "post.id=ps.post_id AND ps.user_id=:userId", { userId })
            // .innerJoinAndMapMany(PostSave, "post_save", "post.id= post_save.post_id", "post_save.user_id= :userId", { userId })
            .orderBy("post.id", "DESC")
        console.log("query", query.getQuery());
        return await this.iPaginateCustom<Posts>(
            query,
            paging.page as number,
            paging.limit as number,
            // queryString.stringify({ ...params, ...paging })
        )
        // return query.getRawMany()
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
        if (params.postType && params.postType == 1) {
            if (params.minPrice) {
                query.andWhere("min_price >= :minPrice", { minPrice: params.minPrice })
            }
            if (params.maxPrice) {
                query.andWhere("max_price <= :maxPrice", { maxPrice: params.maxPrice })
            }
        } else {
            if (params.minPrice) {
                query.andWhere("price >= :minPrice", { minPrice: params.minPrice })
            }
            if (params.maxPrice) {
                query.andWhere("price <= :maxPrice", { maxPrice: params.maxPrice })
            }
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


    async createPost(postData: CreatePostDto): Promise<Posts> {

        let result: InsertResult
        try {
            result = await this.repository.createQueryBuilder()
                .insert()
                .values(postData)
                .execute()
        } catch (error: unknown) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError("INSERT_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.INSERT_ERROR)
            }


            throw new DatabaseError("DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)

        }

        return new Posts(result.generatedMaps[0])
    }

    async updatePostById(id, data: unknown): Promise<any> {
        try {
            //Update Record in User Table

            const res = await this.repository.createQueryBuilder()
                .update()
                .set(data)
                .where("id = :id", { id: id })
                .execute()


        } catch (error: unknown) {
            console.log("data", error);
            if (error instanceof QueryFailedError) {
                throw new DatabaseError(
                    "UPDATE_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.UPDATE_ERROR)
            }
            throw new DatabaseError(
                "DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }

        return await this.repository.findOne({ where: { id: id } })
    }
}