export type UserRole = "admin" | "sales";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthPayload {
  user: AuthUser;
  tokens: AuthTokens;
}