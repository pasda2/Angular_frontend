import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {delay, map, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './model/User';
import {Favorites} from './model/favorites.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  users:User[]=[];
  user:any=undefined;
  constructor(private http: HttpClient,private router:Router){
    this.getUserList().subscribe(value => this.users=value);
  }

  //role:string;
  private recipeListUrl='api/users/all';

  login(username:string,password:string): Observable<boolean> {

    for (let i = 0; i < this.users.length; i++) {
      if (String(this.users.at(i)?.name)==username && String(this.users.at(i)?.password)==password){
        this.user=new User(Number(this.users.at(i)?.id),String(this.users.at(i)?.name),String(this.users.at(i)?.role),String(this.users.at(i)?.password));
      }
    }
    if (this.user==undefined){
      console.error('username or password error');
      this.isLoggedIn=false;
      return of(false);
    }else {
      this.isLoggedIn=true;
      return of(true);
    }
  }
  logout(): void {
    this.isLoggedIn = false;
    this.user=undefined;
    this.router.navigateByUrl('/login');
  }

  getUserRole(){
    return this.user.role;
  }

  getUserList(): Observable<User[]> {

    console.log(this.http.get<User[]>(this.recipeListUrl));
    return this.http.get<User[]>(this.recipeListUrl).pipe(map((data)=>this.transformer(data)));
  }

  private transformer(data:any):User[] {

    return data.map((userData: any) => {
      return new User(userData.id, userData.name, userData.role, userData.password);
    })
  }
}
