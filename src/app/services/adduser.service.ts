import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  private apiUrl = 'api/users/save';

  constructor(private http: HttpClient) {}

  saveUsers(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user,{headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
