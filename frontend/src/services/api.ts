import {
  User,
  Investment,
  ApiError,
  UserRequest,
  CreateInvestmentRequest,
} from "../types/types";

const API_URL = "http://localhost:3000";

const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as ApiError).error ||
        (data as ApiError).message ||
        "An error occurred"
    );
  }

  return data as T;
};

export const login = (email: string) => {
  return apiRequest<User>("/login", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const createUser = (UserRequest: UserRequest) => {
  return apiRequest<User>("/create-user", {
    method: "POST",
    body: JSON.stringify(UserRequest),
  });
};

export const getInvestments = () => {
  return apiRequest<Investment[]>("/investments");
};

export const getUserInvestments = (userId: number) => {
  return apiRequest<Investment[]>(`/investments/${userId}`);
};

export const createInvestment = (newInvestment: CreateInvestmentRequest) => {
  return apiRequest<Investment>("/investments", {
    method: "POST",
    body: JSON.stringify(newInvestment),
  });
};

export const funds = [
  {
    id: "equities-fund",
    name: "Equities Fund",
    description: "A fund focused on equity investments in global markets",
    risk: "High" as const,
    category: "Equity",
  },
  {
    id: "bond-fund",
    name: "Bond Fund",
    description: "A lower-risk fund focused on government and corporate bonds",
    risk: "Low" as const,
    category: "Fixed Income",
  },
  {
    id: "balanced-fund",
    name: "Balanced Fund",
    description: "A diversified fund with a mix of equities and bonds",
    risk: "Medium" as const,
    category: "Mixed",
  },
  {
    id: "property-fund",
    name: "Property Fund",
    description: "Investment in commercial and residential properties",
    risk: "Medium" as const,
    category: "Property",
  },
];
