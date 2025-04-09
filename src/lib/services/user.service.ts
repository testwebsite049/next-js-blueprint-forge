
import { api } from '@/lib/api/axios';
import { IUser, ICreateUser, IUpdateUser } from '@/lib/models/user.model';

class UserService {
  async getUsers(): Promise<IUser[]> {
    const response = await api.get('/users');
    return response.data;
  }

  async getUserById(id: string): Promise<IUser> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData: ICreateUser): Promise<IUser> {
    const response = await api.post('/users', userData);
    return response.data;
  }

  async updateUser(id: string, userData: IUpdateUser): Promise<IUser> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
