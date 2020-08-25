import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      userId: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit(){

    this.login.login(this.form.getRawValue()).subscribe(data=> {
      console.log(data);
      
      this.router.navigateByUrl('/home');
    })
   
    
    
  }

}
