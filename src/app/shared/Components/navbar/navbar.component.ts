import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/products-management/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private _loginService:LoginService, private _router:Router) { }
  ngOnInit(): void {
    this._loginService.isLogged.subscribe((data)=>{this.isLogin = data})

  }

  logOut() {
    this._loginService.logout();
    this._router.navigate(['../Login']);
  }
}
