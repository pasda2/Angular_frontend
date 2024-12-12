import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AdduserService} from '../services/adduser.service';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,private pusher:AdduserService){
    this.userForm=this.fb.group({
      name:[''],
      role:[''],
      password:['']
    })
  }

  onSubmit() {
    const re={
      name:this.userForm.get('name')?.value,
      role:this.userForm.get('role')?.value,
      password:this.userForm.get('password')?.value
    };
    this.pusher.saveUsers(re);
  }
}
