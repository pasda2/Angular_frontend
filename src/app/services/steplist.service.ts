import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Recipe} from '../recipe-list/Model/recipe.model';
import {Ingredient} from '../recipe-list/Model/ingredient.model';
import {Step} from '../recipe-list/Model/steps.model';
import {RecipeDetails} from '../recipe-list/Model/recipedetails.model';

@Injectable({
  providedIn: 'root'
})
export class SteplistService {

  constructor(private http:HttpClient) { }
  private stepsUrl = 'api/steps/all';
  getSteps(): Observable<Step[]> {
    return this.http.get<Step[]>(this.stepsUrl).pipe(map((data)=>this.transformer(data)));
  }
  private transformer(data: any): Step[] {
    const steps:Step[] = data.map((step:Step)=>({
      id: step.id,
      description: step.description,
      ingredients: step.ingredients.map((ingredient:Ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        description: ingredient.description,
      })),
    }));

    return steps;

  };

}
