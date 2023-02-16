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
export interface PortfolioItem {
  price: number;
  change: number;
  symbol: string;
  note: string;
  targetPrice: number;
}

export interface Portfolio {
  sheet: PortfolioItem[];
}

export interface News {
  id: number;
  headline: string;
  body: string;
  fetchedFrom: string;
  symbol: string;
  linkUrl: string;
  imageUrl: string;
  originalCreatedAt: string;
  favoredByCurrentUser: boolean;
}

export interface Page {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface MarketNewsQueryParams {
  page: number;
  keyword: string;
}

export interface CompanyNewsQueryParams {
  page: number;
  symbol: string;
}

export interface FavoriteNewsQueryParams extends MarketNewsQueryParams {}

export interface Ticker {
  symbol: string;
  formalName: string;
}

export interface NewsPage {
  contents: News[];
  page: Page;
}

export interface User {
  email?: string | null;
  uid?: string;
  idToken?: string;
  displayName?: string | null;
  photoURL?: string | null;
  isAuthenticationError?: boolean;
  isAuthenticated?: boolean;
  error?: { message?: string };
  success?: { message?: string };
}

export interface UserAuthentication {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
}

export interface UserCredential {
  email: string;
  password: string;
  password_confirmation?: string;
}
