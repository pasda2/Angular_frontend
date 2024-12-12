import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../recipe-list/Model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FormPusherService {

  private apiUrl = 'api/recipelist/save';

  constructor(private http: HttpClient) {}

  // Method to send recipe data to the backend
  saveRecipe(recipe: any): Observable<any> {
    return this.http.post(this.apiUrl, recipe,{headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
