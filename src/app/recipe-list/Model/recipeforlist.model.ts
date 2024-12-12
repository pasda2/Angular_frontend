import {RecipeDetails} from './recipedetails.model';

export class RecipeforList {
  constructor(
    public id:number,
    public name:string,
    //public rating:number,
    public author:string,
    public preview:string,
    public picpath:string
  )
  {}
}
