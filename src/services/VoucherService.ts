import { BaseApiService } from './api';
import { AxiosResponse } from 'axios';

export class VoucherService extends BaseApiService {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async generateVouchers(count: number): Promise<AxiosResponse<string[]>> {
    return this.post<string[]>('/vouchers/generate', { count });
  }

  async uploadVouchers(vouchers: string[]): Promise<{ success: number; failed: number }> {
    const result = await this.post<{ success: number; failed: number }>('/vouchers/upload', { vouchers });
    return result.data;
  }

  async lookupVoucher(code: string): Promise<{ valid: boolean; details?: any }> {
    const result = await this.get<{ valid: boolean; details?: any }>(`/vouchers/lookup?code=${code}`);
    return result.data;
  }
}