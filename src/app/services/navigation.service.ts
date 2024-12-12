import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }
  private currentPageSubject= new BehaviorSubject<string>('home'); // Default to 'home'
  currentPage$ = this.currentPageSubject.asObservable();
  setPage(page: string) {
    this.currentPageSubject.next(page);
  }
}
