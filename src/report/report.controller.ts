import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { ReportService } from "./report.service";

@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    try {
      await this.reportService.sendReportToMail(createReportDto);
    } catch (error) {
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }
}
