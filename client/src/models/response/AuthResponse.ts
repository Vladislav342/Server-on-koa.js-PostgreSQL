import { UserI } from '../../types/UserI';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserI[];
  message?: string;
}
