import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service';
import { fromEvent } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost/PHPBaseBack/public/'
  constructor(
    private http: HttpClient,
    private encrypt: AESEncryptDecryptService
    ) { }


  login(data){
    
    this.encrypt.setKey(this.encrypt.getInitialKey());
    return this.postBase('auth/login',data);
    
  
  }


  postBase(url,data){
    var body = {};
    var key = this.encrypt.getKey();
    body[this.encrypt.CryptoJSAesEncrypt(key,data.userId)]= this.encrypt.CryptoJSAesEncrypt(key, JSON.stringify(data));
    return this.http.post(this.apiUrl+ url ,body).pipe(tap((ev:any) => this.encrypt.setKey(JSON.parse(this.encrypt.CryptoJSAesDecrypt(this.encrypt.getKey(),ev.data)).newHash)),
      map((ev:any) => JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).data
      
        )
      );
  }
}
