import { Injectable } from '@nestjs/common';
import { ReportType, data } from '../data'
import { v4 as uuid } from 'uuid'
import { ReportResponseDTO } from '../dtos/report.dto';

interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDTO[] {
    const reports = data.report.filter((report) => report.type === type)
    .map(report => new ReportResponseDTO(report));
    return reports;
  }

  getReportByID(type: ReportType, id: string): ReportResponseDTO {
    const reports = data.report.filter((report) => report.type === type);
    const report = reports.find((report) => report.id === id)
    if (!report) return;
    return new ReportResponseDTO(report);
  }

  createNewReport(type: ReportType, body: ReportData) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }
    data.report.push(newReport);
    return new ReportResponseDTO(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReportData) {
    const report = data.report
      .filter((report) => report.type == type)
      .find((report) => report.id == id)

    if (!report) return "Report not found";

    const reportIndex = data.report.findIndex((report) => report.id === id)


    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }

    return new ReportResponseDTO(data.report[reportIndex]);

  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id)
    if (reportIndex !== -1) {
      data.report.splice(reportIndex, 1);
      return;
    } else { return "Not Found" }
  }
}