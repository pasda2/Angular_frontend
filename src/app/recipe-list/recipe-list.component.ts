import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Query,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {RecipeDetailComponent} from '../recipe-detail/recipe-detail.component';
import {NgClass, NgStyle} from '@angular/common';
import {Recipe} from './Model/recipe.model';
import {RecipeService} from '../services/recipe.service';
import {RecipeforList} from './Model/recipeforlist.model';
import {NavigationService} from '../services/navigation.service';
import {RouterLink} from '@angular/router';
import {AddfavoriteService} from '../services/addfavorite.service';
import {AuthService} from '../auth/auth.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeDetailComponent,
    NgStyle,
    NgClass,
    RouterLink,
    FormsModule
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{
  recipe!:Recipe;

  searchTerm: string = '';

  recipes: RecipeforList[]=[];
  tmprecipes:RecipeforList[]=[];
  selectedRecipe:RecipeforList|undefined;

  constructor(private recipeService:RecipeService,private navigationService: NavigationService,private favoriteservice:AddfavoriteService,protected authservice:AuthService) {}

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

  addFavorite(recipeid:number){
    console.log(recipeid)
    const re={
      recipeid: recipeid,
      userid:this.authservice.user.id
    };
    console.log(re)
    this.favoriteservice.saveFavorite(re).subscribe(response => {
      console.log('Saved successfully:', response);
    }, error => {
      console.error('Error saving favorite:', error);
    });
  }

  navigateTo(page: string) {
    console.log(page);
    this.navigationService.setPage(page);
  }

  initRecipes(): void {
    this.recipeService.getRecipeList().subscribe(value => this.recipes=value);
    this.recipeService.getRecipeList().subscribe(value => this.tmprecipes=value);

  }

  search(){
    if (this.searchTerm.trim()) {
      this.tmprecipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.tmprecipes = this.recipes; // Reset if searchTerm is empty
    }
    /*this.tmprecipes=this.recipes;
    for (let i = 0; i < this.tmprecipes.length; i++) {
      if (!this.tmprecipes.at(i)?.name.includes(this.searchTerm)){
        this.tmprecipes.splice(i);
      }
    }*/
  }

  clearselectedRecipe() {
    this.selectedRecipe = undefined;
  }
}
