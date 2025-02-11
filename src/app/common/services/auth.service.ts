import { inject, Injectable } from '@angular/core';
import { IUserWithToken } from '../../modules/auth/data/user.interface';
import { IRequest } from '../interfaces/request.interface';
import { IResponse } from '../interfaces/response.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _accessToken: string;
  private readonly apiService = inject(ApiService);

  constructor() {
    this._accessToken = '';
  }

  async login(
    username: string,
    password: string
  ): Promise<IResponse<IUserWithToken>> {
    const request: IRequest = {
      method: 'POST',
      path: '/users/login',
      body: {
        username,
        password,
      },
    };

    const response = await this.apiService.call<IUserWithToken>(request);

    if (response?.data) {
      this._accessToken = response.data.token;
      localStorage.setItem('accessToken', this._accessToken);
    }

    return response;
  }

  logout() {
    this._accessToken = '';
    localStorage.removeItem('accessToken');
  }

  get accessToken() {
    return this._accessToken || localStorage.getItem('accessToken');
  }

  isAuthenticated() {
    if (!this.accessToken || this.accessToken === '') {
      return false;
    }

    return true;
  }
}
