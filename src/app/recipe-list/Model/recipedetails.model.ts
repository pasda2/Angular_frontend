import {Step} from './steps.model';
import {Ingredient} from './ingredient.model';

export class RecipeDetails {
  constructor(
    public id:number,
    public description:string,
    public steps:Step[],
    public ingredients:Ingredient[]
  ) {}
}
