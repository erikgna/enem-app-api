import { Injectable } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { IServiceResponse } from "src/interfaces/ServiceResponse";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class ReportService {
  constructor(private mailService: MailerService) {}

  async sendReportToMail(report: CreateReportDto): Promise<IServiceResponse> {
    await this.mailService.sendMail({
      to: process.env.TO_EMAIL,
      from: process.env.EMAIL_USER,
      subject: "Report de Problema no app ENEM",
      html: `<h3>ID da Questao: ${report.id}</h3><br /><p>${report.msg}</p>`,
    });
    return { status: 201 };
  }
}
