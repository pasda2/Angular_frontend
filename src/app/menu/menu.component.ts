import { Component } from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  pages = ['home', 'about', 'recipe/:id','add-recipe','edit-recipe/:id','favorites'];

  constructor(private navigationService: NavigationService,protected authservice:AuthService) {}

  // Call the service to set the page
  navigateTo(page: string) {
    this.navigationService.setPage(page);
  }
}
