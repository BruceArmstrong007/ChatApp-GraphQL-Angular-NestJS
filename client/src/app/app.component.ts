import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RegisterGQL } from '../generated-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showFiller = false;

  constructor(private readonly registerUser: RegisterGQL) {

  }

  register() {
    this.registerUser.mutate({createUserData:{
      username:"demo1",
      email:"demo1@example.com",
       password: "ssssssss22",
        confirmPassword: "ssssssss22"
    }}).subscribe(() => {})
  }
}
