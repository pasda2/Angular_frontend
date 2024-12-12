import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg:string|undefined;

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl<string>(''),
    password: new FormControl<string>('')
  });


  constructor(protected authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const loginFormValue = this.loginForm.value;
    if (loginFormValue.userName && loginFormValue.password) {
      this.login(loginFormValue.userName,loginFormValue.password);
      /*this.errorMsg = undefined;
      this.authService
        .login(loginFormValue.userName, loginFormValue.password)
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: () => {
            this.errorMsg = 'Invalid User/Pass';
          }
        });*/
    } else {
      this.errorMsg = 'Invalid User/Pass';
    }
  }

  //constructor(public authService: AuthService, public router: Router) {}
  login(username:string,password:string) {
    this.authService.login(username,password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        const redirectUrl = '/home';
        this.router.navigate([redirectUrl]);
      }
    });
  }
  logout() {
    this.authService.logout();
  }

}
