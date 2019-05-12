import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private loginService: LoginService) { }


  public username:String;
  public password:String;

  ngOnInit() {
  }

  public onSubmit(): void {
    this.loginService.login(this.username, this.password).subscribe(
      data => this,
      error => this,
      () => this.router.navigate(['/userhome'])
    );
  }

}