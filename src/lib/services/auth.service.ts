
import { api } from '@/lib/api/axios';
import { IAuthResponse } from '@/lib/models/user.model';

class AuthService {
  async login(email: string, password: string): Promise<IAuthResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await api.post('/auth/register', { name, email, password });
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  }

  async getCurrentUser(): Promise<IAuthResponse> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();
