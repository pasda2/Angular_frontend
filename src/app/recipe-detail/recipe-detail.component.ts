import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Recipe} from '../recipe-list/Model/recipe.model';
import {RecipeDetailsService} from '../services/recipe-details.service';
import {NavigationService} from '../services/navigation.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  @Input() recipe:Recipe|undefined;
  //@Output() clearDetails:EventEmitter<any>=new EventEmitter();


  constructor(private recipeDetailsService:RecipeDetailsService,private navigationService: NavigationService,private route: ActivatedRoute) {
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.initRecipeDetails(id);
  }


  private initRecipeDetails(id:number) {
    this.recipeDetailsService.getRecipeDetails(id).subscribe(value => this.recipe=value);
  }
}
