export type PackDetail = {
  roi: number;
  amount: number;
  number_of_day: number;
};

export type PackData = {
  id?: string;
  name: string;
  details: PackDetail[];
};

export type Transaction = {
  id: string;
  doc_id: string;
  amount: number;
  user_id: string;
  account: "main" | "affiliate";
  type: "investment" | "withdraw";
  payment_mean?: "orange" | "wave" | "crypto";
  status: "pending" | "success" | "approved" | "rejected";
  pack?: {
    id: string;
    roi: number;
    name: string;
    amount: number;
    end_date: Date;
    start_date: Date;
    number_of_day: number;
  };
  created_at: Date;
};

export type UserKYC = {
  file: string;
  status: "pending" | "approved" | "rejected";
  type: "id_card" | "passport" | "driving_license" | "consular_card";
};

export type UserInfo = {
  id: string;
  city: string;
  kyc: UserKYC;
  email: string;
  phone: string;
  sex: "M" | "F";
  country: string;
  lastname: string;
  password: string;
  created_at: Date;
  firstname: string;
  referral_id: string;
  referral_code: string;
  clear_password: string;
  role: "user" | "admin";
};

export type Referrals = {
  count: number;
  referrals: UserInfo[];
};

export type AccountBalance = {
  main: number;
  affiliate: number;
};

export type TransactionSummary = {
  count: number;
  totalDeposits: number;
  totalInvestments: number;
  totalWithdrawals: number;
  transactions: Transaction[];
};

export type DashboardData = {
  user: UserInfo;
  referrals: Referrals;
  account: AccountBalance;
  transactions: TransactionSummary;
};
