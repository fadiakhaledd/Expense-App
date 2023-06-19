import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';
@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const incomeReports = this.reportService.getAllReports(ReportType.INCOME);
    const expenseReports = this.reportService.getAllReports(ReportType.EXPENSE);

    const totalExpense = expenseReports.reduce(
      (sum, report) => sum + report.amount,
      0,
    );
    const totalIncome = incomeReports.reduce(
      (sum, report) => sum + report.amount,
      0,
    );

    return {
      totalExpense,
      totalIncome,
      netIncome: totalIncome - totalExpense,
    };
  }
}
