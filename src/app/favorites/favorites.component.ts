import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {RecipeforList} from '../recipe-list/Model/recipeforlist.model';
import {FavoritesService} from '../services/favorites.service';
import {Favorites} from '../auth/model/favorites.model';
import {RouterLink} from '@angular/router';
import {NgClass, NgStyle} from '@angular/common';
import {AddfavoriteService} from '../services/addfavorite.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle,
    NgClass
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  favoriterecipes: Favorites[]=[];
  selectedRecipe:RecipeforList|undefined;
  constructor(private favoriteservice:FavoritesService,protected authservice:AuthService,private deletefavoriteservice:AddfavoriteService) {}

  ngOnChanges(changes: SimpleChanges){
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue ?
        inputValues.previousValue.name : inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue ?
        inputValues.currentValue.name : inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
    }
    console.log("OnChanges happened");
  }

  ngOnInit(){
    this.initRecipes();
  }

  onSelect(recipe : RecipeforList){
    this.selectedRecipe = recipe;
  }

  initRecipes(): void {
    this.favoriteservice.getFavoriteRecipeList(this.authservice.user.id).subscribe(value => this.favoriterecipes=value);

  }

  removeFavorite(id: number) {
    this.deletefavoriteservice.deleteFavorite(id).subscribe(response => {
      console.log('Saved successfully:', response);
    }, error => {
      console.error('Error saving favorite:', error);
    });
  }
}
