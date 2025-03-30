export type User = {
  id: number;
  email: string;
  name: string;
};

export type UserRequest = {
  email: string;
  name: string;
};

export type Fund = {
  id: string;
  name: string;
  description: string;
  risk: "Low" | "Medium" | "High";
  category: string;
};

export type Investment = {
  id: number;
  user_id: number;
  fund_id: string;
  amount: number;
};

export type TopFundInvestment = {
  fund: Fund;
  amount: number;
};

export type CreateInvestmentRequest = {
  user_id: number;
  fund_id: string;
  amount: number;
};

export type ApiError = {
  error?: string;
  message?: string;
};

export const riskColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};
