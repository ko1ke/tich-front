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

interface NewsResponse {
  contents: News[];
  page: Page;
}
