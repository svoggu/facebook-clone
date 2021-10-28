import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { Postable } from '../models/postable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl:string = 'http://localhost:3000/';
  baseUrl:string = !environment.production ? 'http://localhost:3000/api/' : '/api/'; 

  constructor(private http: HttpClient){ }

  get<T>(resourceName: string) {
    return this.http.get<T>(this.baseUrl + resourceName, {
      withCredentials: true
    });
  }
  post<T,D>(resourceName: string, data: D) {
    return this.http.post<T>(this.baseUrl + resourceName, data, {
      withCredentials: true
    });
  }

  delete<T>(resourceName: string) {
    return this.http.delete<T>(this.baseUrl + resourceName);
  }

  put<T,D>(resourceName: string, data: D) {
    return this.http.put<T>(this.baseUrl + resourceName, data);
  }
}
