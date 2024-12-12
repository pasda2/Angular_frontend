import {RecipeDetails} from './recipedetails.model';


export class Recipe {
  constructor(
    public id:number,
    public name:string,
    public description:string,
    //public rating:number,
    public author:string,
    public image:string,
    public details:RecipeDetails
    )
  {}
}
