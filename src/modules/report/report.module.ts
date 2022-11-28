import { ApiResponseService } from "src/api-response/api-response.service";
import { MessageComponent } from "src/components/message.component";
import { Report } from "src/entities/Report.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Report]),
    ],
    providers: [MessageComponent, ApiResponseService, ReportService],
    exports: [TypeOrmModule],
    controllers: [ReportController],
})
export class ReportModule { }