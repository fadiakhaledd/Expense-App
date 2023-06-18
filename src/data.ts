export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense"
}

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    },
    {
      id: 'uuid2',
      source: 'Food',
      amount: 5560,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 'uuid3',
      source: 'Clothe',
      amount: 6900,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    },
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType
  }[]
}

