export type UserRequest = {
  email: string;
  name: string;
};

export type UserResponse = {
  id: number;
  email: string;
  name: string;
};

export interface InvestmentRequest {
  user_id: number;
  fund_id: string;
  amount: number;
}

export interface InvestmentResponse {
  id: number;
  user_id: number;
  fund_id: string;
  amount: number;
}
