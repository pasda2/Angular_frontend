import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Ingredient} from '../recipe-list/Model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http:HttpClient) {}
  private recipeListUrl='api/ingredients/all';

  getIngredientList(): Observable<Ingredient[]> {

    console.log(this.http.get<Ingredient[]>(this.recipeListUrl));
    return this.http.get<Ingredient[]>(this.recipeListUrl).pipe(map((data)=>this.transformer(data)));
  }

  private transformer(data:any):Ingredient[] {

    return data.map((ingredData: any) => {
      return new Ingredient(ingredData.id, ingredData.name, ingredData.description);
    })
  }
}
