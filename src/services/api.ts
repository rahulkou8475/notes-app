import axios, { AxiosInstance } from 'axios';

// Types
export interface User {
  id: string;
  email: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  summary?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  image_url?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Get API URL from environment variable or use proxy for development
const getApiBaseURL = () => {
  // In production, use the environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use the Vite proxy
  return '/api';
};

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (email: string, password: string): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/register', {
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

// Notes API
export const notesAPI = {
  getAll: async (): Promise<Note[]> => {
    const response = await api.get<Note[]>('/notes');
    return response.data;
  },

  getOne: async (id: number): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  create: async (note: NoteCreate): Promise<Note> => {
    const response = await api.post<Note>('/notes', note);
    return response.data;
  },

  update: async (id: number, note: Partial<NoteCreate>): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, note);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },

  summarize: async (id: number): Promise<Note> => {
    const response = await api.post<Note>(`/notes/${id}/summarize`);
    return response.data;
  },
};

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ url: string }>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

