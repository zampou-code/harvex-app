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
  amount: number;
  user_id: string;
  fee_amount: number;
  payment_mean?: "orange" | "wave" | "crypto";
  account: "main" | "affilate";
  type: "investment" | "deposit" | "withdraw";
  status: "pending" | "success" | "rejected" | "expired";
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
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  kyc: UserKYC;
  role: "user" | "admin";
  sex: "M" | "F";
  referral_code: string;
  referral_id: string;
  created_at: Date;
};

export type Referrals = {
  count: number;
  referals: UserInfo[];
};

export type AccountBalance = {
  main: number;
  affiliate: number;
};

export type TransactionSummary = {
  totalInvestments: number;
  totalDeposits: number;
  totalWithdrawals: number;
  transactions: Transaction[];
  count: number;
};

export type DashboardData = {
  user: UserInfo;
  referrals: Referrals;
  account: AccountBalance;
  transactions: TransactionSummary;
};
