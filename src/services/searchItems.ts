export interface SearchItem {
  name: string;
  href: string;  
  id?: string;    
}

export const searchItems: SearchItem[] = [
  { name: "Debt", href: "/services/debts" },
  { name: "Bill", href: "/services/bills" },
  { name: "Bills Report", href: "/settings/profile/report", id: "billsReport" },
  { name: "Expense", href: "/services/expenses" },
  { name: "Expenses Report", href: "/settings/profile/report",id: "expensesReport" },
  { name: "Income", href: "/services/income" },
  { name: "Reminder List", href: "/reminder" },
  { name: "Budget", href: "/budget" },
  { name:"Insights",href:"/settings/profile/report", id:"insights" },
{ name:"Financial Overview",href:"/settings/profile/report", id:"FinancialOverview" },

];