import {
    Controller,
    Get, Post, Put, Delete,
    Param, Body, HttpCode,
    ParseUUIDPipe, ParseEnumPipe
  } from '@nestjs/common';
  import { ReportType } from '../data'
  import { ReportService } from './report.service'
  import { CreateReportDTO, ReportResponseDTO, UpdateReportDTO } from '../dtos/report.dto'
  
  @Controller('report/:type')
  export class ReportController {
  
    constructor(private readonly reportService: ReportService) { }
  
    @Get()
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: String): ReportResponseDTO[] {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.getAllReports(reportType)
    }
  
    @Get(':id')
    getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string,
      @Param('id', ParseUUIDPipe) id: string): ReportResponseDTO | string {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      let report = this.reportService.getReportByID(reportType, id);
      return report;
    }
  
    @Post()
    postReport(@Param('type', new ParseEnumPipe(ReportType)) type: string,
      @Body() body: CreateReportDTO): ReportResponseDTO {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.createNewReport(reportType, body);
    }
  
    @Put(':id')
    updateReport(@Param('type', new ParseEnumPipe(ReportType)) type: string,
      @Param('id', ParseUUIDPipe) id: string,
      @Body() body: UpdateReportDTO): ReportResponseDTO | string {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.updateReport(reportType, id, body)
    }
  
  
    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
      return this.reportService.deleteReport(id);
    }
  }
  