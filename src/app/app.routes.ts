import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {authGuard} from './auth/auth.guard';
import {AccesdeniedComponent} from './accesdenied/accesdenied.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: RecipeListComponent, data:{roles:['admin']},canActivate: [authGuard] },
  { path: 'recipe/:id', component: RecipeDetailComponent ,data:{roles:['admin','user']},canActivate: [authGuard]},
  { path: 'add-recipe', component: RecipeFormComponent, data:{roles:['admin','user']},canActivate: [authGuard] },
  { path: 'favorites', component: FavoritesComponent, data:{roles:['admin','user']},canActivate: [authGuard] },
  {path:'acces-denied',component:AccesdeniedComponent},
  { path: '404', component: PageNotFoundComponent, data:{roles:['admin','user']},canActivate: [authGuard] },
  { path: '**', redirectTo: '404', pathMatch: 'full' }

];
