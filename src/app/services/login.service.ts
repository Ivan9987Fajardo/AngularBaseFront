import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service';
import { fromEvent } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { stringify } from 'querystring';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpService,
    private encrypt: AESEncryptDecryptService
    ) { }


  login(data){
    
    this.encrypt.setKey(this.encrypt.getInitialKey());
    localStorage.setItem('user',this.encrypt.CryptoJSAesEncrypt(this.encrypt.getInitialKey(),data.userId));
    return this.http.postBase('/auth/login',data).pipe(tap((data:any)=>{
      }, (err)=>{
        localStorage.removeItem('user');
      }
    ));
  }


  
}
