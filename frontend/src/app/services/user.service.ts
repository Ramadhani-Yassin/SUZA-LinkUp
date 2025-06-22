// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendConfigService } from './backend-config.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserDetails(arg0: { email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
  ) {}

  private get apiUrl(): string {
    return `${this.backendConfigService.getBackendUrl()}/api/users`;
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }

  // Other methods as needed
}
