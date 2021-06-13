import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from 'src/app/helpers/helpers';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  invalid = false;

  constructor(private authenticationService: AuthenticationService, private helpers: Helpers, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    this.invalid = false;
    if (this.username === '' || this.password === '') {
      this.invalid = true;
    } else {
      this.authenticationService.login({ username: this.username, password: this.password }).subscribe(data => {
        if (data.token !== undefined && data.token !== null) {
          this.helpers.setToken(data.token);
        //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        //     this.router.navigate(['dashboard']);
        // });
          this.router.navigate(['dashboard']);
        } else {
          this.invalid = true;
        }
      });
    }
  }

}
