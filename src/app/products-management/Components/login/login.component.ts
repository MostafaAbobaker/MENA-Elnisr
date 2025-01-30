import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent {
  errMessage:string = '';
  formLogin:FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password:  new FormControl(null, [Validators.required]),
  })

  constructor(
    private _loginService:LoginService,
    private Router:Router ,
    private messageService: MessageService
  ){}


  login() {

    console.log(this.formLogin);
    if(this.formLogin.valid) {
      this._loginService.login(this.formLogin.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          // Redirect to dashboard
          this.Router.navigate(['/home']);
          console.log('Done Login' , localStorage.getItem('token'));

        },
        error: (err) => {
          this.errMessage = err.message;
          this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });
          console.log(err);

        }
      })

    }
  }
}
