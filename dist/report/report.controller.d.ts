import { CreateReportDto } from "./dto/create-report.dto";
import { ReportService } from "./report.service";
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto): Promise<void>;
}
