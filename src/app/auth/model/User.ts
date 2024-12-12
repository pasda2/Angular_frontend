import {Favorites} from './favorites.model';

export class User{
  constructor(
    public id:number,
    public name:string,
    public role:string,
    public password:string
  ) {}
}
