import {Ingredient} from "./ingredient.model";

export class Step{
    constructor(
        public id:number,
        public description:Text,
        public ingredients:Ingredient[]
    ) {}
}
