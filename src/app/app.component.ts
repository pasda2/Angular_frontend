import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavigationService} from './services/navigation.service';
import {MenuComponent} from './menu/menu.component';
import {AboutComponent} from './about/about.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {LoginComponent} from './auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenuComponent, AboutComponent, RecipeListComponent, FavoritesComponent, RecipeFormComponent, RecipeDetailComponent, ReactiveFormsModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Recipe book';
  currentPage: string='home';

  constructor(private navigationService: NavigationService, protected authservice:AuthService) {}

  ngOnInit() {
    // Subscribe to the current page observable
    this.navigationService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
  }
}
