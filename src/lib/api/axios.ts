
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/lib/services/auth.service';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle unauthorized errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // If token has expired, log out the user
      authService.removeToken();
      
      // Only show toast if we're not trying to login or refresh token
      if (!originalRequest.url.includes('/auth/login') && !originalRequest.url.includes('/auth/refresh')) {
        toast({
          variant: "destructive",
          title: "Session expired",
          description: "Please login again to continue.",
        });
        
        // Redirect to login page if you want (you need to implement this logic depending on your app)
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
    
    // Handle forbidden errors (403)
    if (error.response?.status === 403) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permission to access this resource.",
      });
    }
    
    // Handle not found errors (404)
    if (error.response?.status === 404) {
      toast({
        variant: "destructive",
        title: "Not found",
        description: "The requested resource was not found.",
      });
    }
    
    // Handle server errors (500)
    if (error.response?.status === 500) {
      toast({
        variant: "destructive",
        title: "Server error",
        description: "An error occurred on the server. Please try again later.",
      });
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Please check your internet connection and try again.",
      });
    }
    
    return Promise.reject(error);
  }
);
