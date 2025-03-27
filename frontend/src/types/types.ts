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
  fund: Fund;
  amount: number;
};

export type TopFundInvestment = {
  fund: Fund;
  amount: number;
};

export type CreateInvestmentRequest = {
  user_id: number;
  fund: string;
  amount: number;
};

export type ApiError = {
  error?: string;
  message?: string;
};
