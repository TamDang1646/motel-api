import { BaseService } from "src/base/base.service";
import { Auth } from "src/entities/Auth";

import { Injectable } from "@nestjs/common";

import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthServices extends BaseService<Auth, AuthRepository> {
    


    
}     