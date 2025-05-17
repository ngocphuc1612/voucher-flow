import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

class BaseApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // Handle errors globally here if needed
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, { params });
  }

  protected async post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data);
  }

  protected async put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  protected async delete<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, { params });
  }
}

export { BaseApiService };