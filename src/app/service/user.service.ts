import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  authenticateUser(email: string, password: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?email=${email}&password=${password}`);
  }
}
