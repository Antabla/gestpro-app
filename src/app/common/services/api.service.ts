import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRequest } from '../interfaces/request.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  async call<T>(request: IRequest): Promise<IResponse<T>> {
    const url = environment.apiUrl + request.path;

    let httpCall;

    switch (request.method) {
      case 'GET':
        httpCall = this.http.get<IResponse<T>>(url);
        break;
      case 'POST':
        httpCall = this.http.post<IResponse<T>>(url, request.body);
        break;
      case 'PUT':
        httpCall = this.http.put<IResponse<T>>(url, request.body);
        break;
      case 'DELETE':
        httpCall = this.http.delete<IResponse<T>>(url);
        break;
    }

    return await lastValueFrom(httpCall);
  }
}
