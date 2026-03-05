export interface SearchItem {
  name: string;
  href: string;
  category: "Header" | "Service" | "Report" | "Profile" | "Page";
  id?: string;
}

export const searchItems: SearchItem[] = [
  { name: "Home", href: "/", category: "Header" },
  { name: "Reminder", href: "/reminder", category: "Header" },
  { name: "Budget", href: "/budget", category: "Header" },

  {
    name: "How to Manage Your Finances",
    href: "/",
    category: "Page",
    id: "hero",
  },
  {
    name: "Financial Overview in home",
    href: "/",
    category: "Page",
    id: "financial-overview",
  },
  { name: "Our Services", href: "/", category: "Page", id: "services" },
  { name: "Why Choose Us", href: "/", category: "Page", id: "why-choose-us" },
  { name: "Attention Needed", href: "/", category: "Page", id: "alerts" },
  { name: "AI Powered Budget", href: "/", category: "Page", id: "ai-budget" },
  { name: "Your Rewards", href: "/", category: "Page", id: "rewards" },

  { name: "Debt", href: "/services/debts", category: "Service" },
  { name: "Bill", href: "/services/bills", category: "Service" },
  { name: "Expense", href: "/services/expenses", category: "Service" },
  { name: "Income", href: "/services/income", category: "Service" },

  {
    name: "Bills Report",
    href: "/settings/profile/report",
    category: "Report",
    id: "billsReport",
  },
  {
    name: "Expenses Report",
    href: "/settings/profile/report",
    category: "Report",
    id: "expensesReport",
  },
  {
    name: "Insights",
    href: "/settings/profile/report",
    category: "Report",
    id: "insights",
  },
  {
    name: "Financial Overview",
    href: "/settings/profile/report",
    category: "Report",
    id: "FinancialOverview",
  },

  { name: "Profile Settings", href: "/settings/profile", category: "Profile" },
  {
    name: "Account Details",
    href: "/settings/profile",
    category: "Profile",
  },
  {
    name: "Security / Password",
    href: "/settings/profile?tab=password",
    category: "Profile",
  },

  { name: "About Trackly", href: "/about-us", category: "Page" },
  {
    name: "Trackly Mission",
    href: "/about-us",
    category: "Page",
    id: "mission",
  },

  {
    name: "Download Trackly App",
    href: "/about-us",
    category: "Page",
    id: "download-app",
  },
  {
    name: "Trackly Commitment",
    href: "/about-us",
    category: "Page",
    id: "commitment",
  },
];
