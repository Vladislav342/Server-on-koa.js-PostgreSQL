import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

class AuthService {
  static login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`/api/login`, { login, password }); //?login=${login}&password=${password}
  }

  static registration(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`/api/auth/new_user?login=${login}&password=${password}`, {
      login,
      password,
    });
  }

  static logout(): Promise<AxiosResponse<string>> {
    return $api.delete('/api/logout');
  }
}

export default AuthService;
