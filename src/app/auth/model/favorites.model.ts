
import {RecipeforList} from '../../recipe-list/Model/recipeforlist.model';

export class Favorites{
  constructor(
    public id:number,
    public recipe:RecipeforList,
    public userid:number
  ) {}
}
