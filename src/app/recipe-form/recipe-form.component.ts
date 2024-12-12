import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {Observable, of} from 'rxjs';
import {IngredientListService} from '../services/ingredient-list.service';
import {Ingredient} from '../recipe-list/Model/ingredient.model';
import {FormPusherService} from '../services/form-pusher.service';
import {RecipeService} from '../services/recipe.service';
import {RecipeforList} from '../recipe-list/Model/recipeforlist.model';
import {Step} from '../recipe-list/Model/steps.model';
import {SteplistService} from '../services/steplist.service';
import {IngredientsService} from '../services/ingredients.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent{
  recipeForm: FormGroup;
  ingreds:FormArray;
  steplist:FormArray;
  ingredlist:Ingredient[]=[];
  recipes:RecipeforList[]=[];
  stepsfromdb:Step[]=[];
  ingredsfromdb:Ingredient[]=[]

  constructor(private fb: FormBuilder,private router:Router, private ingredService:IngredientListService,private formPusherService:FormPusherService,private recipeservice:RecipeService, private stepservice:SteplistService, private curentingredservice:IngredientsService) {
    this.ingredService.getIngredientList().subscribe(value => this.ingredlist=value);
    this.recipeservice.getRecipeList().subscribe(value => this.recipes=value);
    this.stepservice.getSteps().subscribe(value => this.stepsfromdb=value);
    this.curentingredservice.getIngredientList().subscribe(value => this.ingredsfromdb=value);
    this.ingreds=this.fb.array([this.fb.group({
      name: [''],
      description: ['']
    })]);
    this.steplist=this.fb.array([this.fb.group({
      description:[''],
      ingredients:this.fb.array([this.fb.group({
        selectedingred:[null]
      })])
    })])
    this.recipeForm = this.fb.group({
      name: [''],
      preview: [''],
      description: [''],
      author: [''],
      picpath:[''],
      steps:this.steplist,
      ingredients:this.ingreds
    });
  }


  getSelectedIngredient(stepIndex: number, ingredientIndex: number): any {
    return this.getIngredients(stepIndex).at(ingredientIndex).get('selectedingred')?.value;
  }

  getUsedIngredients(stepIndex: number, ingredientIndex: number){
    return this.ingredlist.at(this.getSelectedIngredient(stepIndex,ingredientIndex));
  }
  // Add a new step
  addStep() {
    this.steplist.push(this.fb.group({
      description: [''],
      ingredients: this.fb.array([this.fb.group({
        selectedingred:[null]
      })])
    }));
  }

  // Remove a step
  removeStep(index: number) {
    //this.steps.removeAt(index);
  }

  getSteps():FormArray{
    return this.steplist;
  }

  getAllIngredients():FormArray{
    return this.ingreds;
  }

  // Get ingredients of a specific step
  getIngredients(stepIndex: number): FormArray {
    return this.steplist.at(stepIndex).get('ingredients') as FormArray;
  }


  addStepIngredient(stepIndex: number) {
    const stepingreds =this.steplist.at(stepIndex).get('ingredients') as FormArray;
    stepingreds.push(this.fb.group({
      selectedingred:[null]
    }))
    const curstep=this.fb.group({
      description: this.steplist.at(stepIndex).get('description'),
      ingredients: stepingreds
    })
    this.steplist.removeAt(stepIndex);
    this.steplist.insert(stepIndex,curstep);
    this.ingreds.push(this.fb.group({
      selectedingred:[null]
    }))
  }

  addMainIngredient() {
    this.ingreds.clear();
    let allingreds:Ingredient[]=[];
    for (const step in this.steplist.controls) {
      for (const ing in this.steplist.get(step)?.value.ingredients) {
        const ingredient:Ingredient=this.ingredlist.at(Number(this.steplist.get(step)?.get('ingredients')?.get(ing)?.get('selectedingred')?.value)-1) as Ingredient;
        allingreds.push(ingredient);
      }
    }
    allingreds.forEach(item => {
      this.ingreds.push(this.fb.group({
        name:[item.name],
        description:[item.description]
      }));
    });
  }



  onSubmit() {
    if (this.recipeForm.valid) {

      let stepstopush:Step[]=[];
      let i=1;
      for (const step in this.steplist.controls) {
        let stepingreds:Ingredient[]=[];
        for (const ing in this.steplist.get(step)?.value.ingredients) {
          const ingredient:Ingredient=this.ingredlist.at(Number(this.steplist.get(step)?.get('ingredients')?.get(ing)?.get('selectedingred')?.value)-1) as Ingredient;
          stepingreds.push(ingredient);

        }
        stepstopush.push(new Step(this.stepsfromdb.length+i,this.steplist.get(step)?.value.description,stepingreds));
      }

      const re={
        name:this.recipeForm.get('name')?.value,
        author:this.recipeForm.get('author')?.value,
        preview:this.recipeForm.get('preview')?.value,
        picpath:this.recipeForm.get('picpath')?.value,
        steps:stepstopush,
        detailsdesc:this.recipeForm.get('description')?.value
      };
      this.formPusherService.saveRecipe(re).subscribe(
        (response) => {
          console.log('Recipe saved successfully:', response);
        },
        (error) => {
          console.error('Error saving recipe:', error);
        }
      );

      this.router.navigate(['/home']);
    } else {
      console.error('Form is invalid');
    }
  }

  protected readonly of = of;
}
