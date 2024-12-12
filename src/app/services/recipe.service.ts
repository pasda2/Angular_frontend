import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Recipe} from '../recipe-list/Model/recipe.model';
import {RecipeforList} from '../recipe-list/Model/recipeforlist.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http:HttpClient) {}
  private recipeListUrl='api/recipelist/all';

  getRecipeList(): Observable<RecipeforList[]> {

    console.log(this.http.get<RecipeforList[]>(this.recipeListUrl));
    return this.http.get<Recipe[]>(this.recipeListUrl).pipe(map((data)=>this.transformer(data)));
  }

  private transformer(data:any):RecipeforList[] {

    return data.map((recipeData: any) => {
      return new RecipeforList(recipeData.id, recipeData.name, recipeData.author, recipeData.description, recipeData.image);
    })
  }
}
