export type MsgRole = "user" | "ai";
export type MsgType = "text" | "budgetCard";

export type BudgetItem = {
  label: string;
  amount: string;
  colorDot?: string;
};

export type BudgetSegment = {
  label: string;
  value: number;
};

export type BudgetPayload = {
  title: string;
  items: BudgetItem[];
  segments?: BudgetSegment[];
};

export type ChatMessage = {
  id: string;
  role: MsgRole;
  type: MsgType;
  content?: string;
  budget?: BudgetPayload;
};
