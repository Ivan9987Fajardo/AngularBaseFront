import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost/BaseBack/public/'
  constructor(
    private http: HttpClient,
    private encrypt: AESEncryptDecryptService
    ) { }


  login(data){
    var body = {};
    var key = this.encrypt.getInitialKey();
    body[this.encrypt.CryptoJSAesEncrypt(key,data.userId)]= this.encrypt.CryptoJSAesEncrypt(key, JSON.stringify(data));
    console.log();
    
    return this.http.post(this.apiUrl+ 'auth/login',body);
  }
}
