export interface Income {
  id: string;
  amount: number;
  source: string;
  category: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncomeResponse {
  success: boolean;
  data: {
    incomes: Income[];
    totalPages: number;
    totalCount: number;
  };
}

export interface IncomeSummaryResponse {
  success: boolean;
  data: {
    totalIncome: number;
    monthlyIncome: number;
    sourcesCount: number;
  };
}