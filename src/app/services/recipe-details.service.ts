import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipe-list/Model/recipe.model';
import {map, Observable} from 'rxjs';
import {Ingredient} from '../recipe-list/Model/ingredient.model';
import {Step} from '../recipe-list/Model/steps.model';
import {RecipeDetails} from '../recipe-list/Model/recipedetails.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailsService {

  constructor(private http:HttpClient) { }
  private recipeDetailsUrl = 'api/recipelist/';
  getRecipeDetails(recipeId: number): Observable<Recipe> {
    console.log(`${this.recipeDetailsUrl}${recipeId}`)
    return this.http.get<Recipe>(`${this.recipeDetailsUrl}${recipeId}`).pipe(
      map((data) => this.transformToRecipe(data))
    );
  }

  private transformToRecipe(data: any): Recipe {
    console.log(data.toString())
    const ingredients:Ingredient[] = data.details.ingredients.map((ingredient: any) => ({
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
    }));

    const steps:Step[] = data.details.steps.map((step:Step)=>({
      id: step.id,
      description: step.description,
      ingredients: step.ingredients.map((ingredient:Ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        description: ingredient.description,
      })),
    }));

    const details:RecipeDetails=new RecipeDetails(data.details.id,data.details.description,steps,ingredients);
    console.log(details)
    const rec:Recipe=new Recipe(data.id,data.name,data.author,data.description,data.image,details);
    console.log(rec)
    return rec;
    /*{
      id: data.id,
      name: data.name,
      preview: data.description,
      author: data.author,
      picpath: data.image,
      details: {
        id: data.details.id,
        description: data.details.description,
        steps,
        ingredients,
      },*/
    };
  //}
}
  /*
  private transformToRecipe(data: any): RecipeDetails {

    const ingredients = data.ingredients.map(
      (ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        description: ingredient.description,
      })
    );

    const steps = data.steps.map((step: any) => ({
      id: step.id,
      description: step.description,
      ingredients: step.ingredients.map((stepIngredient: any) => ({
        id: stepIngredient.id,
        name: stepIngredient.name,
        description: stepIngredient.description,
      })),
    }));

    return {
      id: data.id,
      description: data.description,
      steps,
      ingredients,
    };
  }*/
  /*
  getRecipeDetails(recipeId:number):Observable<RecipeDetails>{
    console.log(`${this.recipeDetailsUrl}${recipeId}`)
    return this.http.get<RecipeDetails>(`${this.recipeDetailsUrl}${recipeId}`).pipe(map((data)=>this.transformToRecipe(data)))
  }

  private transformToRecipe(data:any): RecipeDetails {
    console.log(data.toString())
    return data.map((recipeData: any) => {
      const ingredients = recipeData.details.ingredients.map((ingredientsData: any) =>
        new Ingredient(ingredientsData.id, ingredientsData.name, ingredientsData.description)
      );

      const steps = recipeData.details.steps.map((stepsData: any) => {
        const stepIngredients = stepsData.ingredients.map((stepIngredientsData: any) =>
          new Ingredient(stepIngredientsData.id, stepIngredientsData.name, stepIngredientsData.description)
        );
        return new Step(stepsData.id, stepsData.description, stepIngredients);
      });

      const details = recipeData.details.map((detailsData: any) =>
        new RecipeDetails(detailsData.id, detailsData.description, steps, ingredients)
      );
      console.log(recipeData.name)
      return details;
    });
  }*/

