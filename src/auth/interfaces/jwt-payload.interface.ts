export interface JwtPayload {
  email: string;
  userType: string; // Could be 'user' or 'admin'
  sub: number; // user id
}
