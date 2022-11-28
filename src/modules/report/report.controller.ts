import { BaseController } from "src/base/base.controller";
import { iPaginationOption } from "src/base/pagination.dto";
import { MessageComponent } from "src/components/message.component";

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { CreateReportDto } from "./dto/create-report.dto";
import { GetAllReports } from "./dto/get-all.dto";
import { ReportService } from "./report.service";

@ApiBearerAuth()
@ApiTags('Report Posts')
@Controller("report")
export class ReportController extends BaseController {
    constructor(
        private readonly reportService: ReportService,
        // private readonly userService: UserService,
        // private readonly postService: PostService,
        // private readonly saveService: PostSaveService,
        // private readonly configService: ConfigService,
        // private readonly component: ComponentService,
        private i18n: MessageComponent,
    ) {
        super(i18n);
    }


    /**
     * 
     * @param paging 
     * @param params 
     * @returns 
     */
    @Get()
    async getAll(
        @Query() paging: iPaginationOption,
        @Query() params: GetAllReports
    ): Promise<any> {
        console.log('params', params);
        try {
            return await this.reportService.getAll(params, paging)
        } catch (error) {
            this.throwErrorProcess(error)
        }
        return
    }

    @Post()
    async createReport(
        @Body() report: CreateReportDto
    ): Promise<any> {
        try {
            return await this.reportService.createReport(report)
        } catch (error) {
            this.throwErrorProcess(error)
        }
        return
    }
}