import $api from '../http';
import { AxiosResponse } from 'axios';
import { UserI } from '../types/UserI';

class UserService {
  static getUsers(): Promise<AxiosResponse<UserI[]>> {
    return $api.get<UserI[]>('/api/all/users');
  }
}

export default UserService;
