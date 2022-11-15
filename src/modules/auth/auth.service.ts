import { BaseService } from "src/base/base.service";
import { Auth } from "src/entities/Auth";
import { User } from "src/entities/User";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthServices extends BaseService<Auth, AuthRepository> {
    constructor(
        @InjectRepository(Auth)
        repository: AuthRepository,
    ) {
        super(repository)
    }

    async createUser(userData: Auth): Promise<User>{
        let authData = {...userData, language: 'vi'}
        console.log("authData: ", authData);
        
        return
    }


    
}     