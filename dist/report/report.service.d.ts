import { CreateReportDto } from "./dto/create-report.dto";
import { IServiceResponse } from "src/interfaces/ServiceResponse";
import { MailerService } from "@nestjs-modules/mailer";
export declare class ReportService {
    private mailService;
    constructor(mailService: MailerService);
    sendReportToMail(report: CreateReportDto): Promise<IServiceResponse>;
}
