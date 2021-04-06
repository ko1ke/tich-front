export interface AuthProps {
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface PortfolioProps {
  symbol: string;
  note: string;
  targetPrice: string;
}