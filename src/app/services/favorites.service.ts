import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {RecipeforList} from '../recipe-list/Model/recipeforlist.model';
import {Recipe} from '../recipe-list/Model/recipe.model';
import {Favorites} from '../auth/model/favorites.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private http:HttpClient) {}

  getFavoriteRecipeList(id:number): Observable<Favorites[]> {
    let favoriterecipeListUrl='api/favorites/'+String(id);
    console.log(this.http.get<Favorites[]>(favoriterecipeListUrl));
    return this.http.get<Favorites[]>(favoriterecipeListUrl).pipe(map((data)=>this.transformer(data)));
  }

  private transformer(data:any):Favorites[] {

    return data.map((recipeData: any) => {
      const rec= new RecipeforList(recipeData.recipe.id, recipeData.recipe.name, recipeData.recipe.author, recipeData.recipe.description, recipeData.recipe.image);
      return new Favorites(recipeData.id,rec,recipeData.user.id);
    })
  }
}
