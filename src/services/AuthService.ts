import { BaseApiService } from "./api";

export class AuthService extends BaseApiService {
  constructor() {
    super(process.env.API_BASE_URL!);
  }

  async signin(credentials: any) {
    // Implement signin logic
    return this.post('/auth/signin', credentials);
  }

  async signup(userData: any) {
    // Implement signup logic
    return this.post('/auth/signup', userData);
  }
}