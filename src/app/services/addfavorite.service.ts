import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddfavoriteService {

  private apiUrl = 'api/favorites/save';

  constructor(private http: HttpClient) {}

  saveFavorite(favorite: any): Observable<any> {
    console.log(favorite)
    return this.http.post(this.apiUrl, favorite,{headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
  deleteFavorite(favoriteid:number):Observable<any>{
    return this.http.post('api/favorites/delete/'+String(favoriteid),{headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
}
