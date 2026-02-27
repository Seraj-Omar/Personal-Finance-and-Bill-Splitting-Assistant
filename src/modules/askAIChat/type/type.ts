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
  subtitle?: string;
  items: BudgetItem[];
  segments: BudgetSegment[]; // خليها required بدل optional
};

export type ChatMessage = {
  id: string;
  role: MsgRole;
  type: MsgType;
  content?: string;
  budget?: BudgetPayload;
};

export type AIChatRequest = {
  message: string;
  chatId?: string; // optional: أول مرة ممكن ما يكون موجود
};

export type AIChatResponse = {
  success: boolean;
  message: string;
  data: {
    message: string | undefined;
    response: string;
    chatId: string;
  };
};

export type BudgetSuggestionItem = {
  category: string;
  amount: number;
  percentage: number;
};

export type SuggestBudgetResponse = {
  success: boolean;
  message: string;
  data: {
    data: BudgetSuggestionItem[];
  };
};


