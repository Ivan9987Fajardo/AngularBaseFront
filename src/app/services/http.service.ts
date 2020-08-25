import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'http://localhost/PHPBaseBack/public'
  constructor(
    private http: HttpClient,
    private encrypt: AESEncryptDecryptService
  ) { }

  postBase(url,data){
    var body = {};
    var key = this.encrypt.getKey();
    body[localStorage.getItem('user')]= this.encrypt.CryptoJSAesEncrypt(key, JSON.stringify(data));
    return this.http.post(this.apiUrl+ url ,body).pipe(tap((ev:any) =>{this.encrypt.setKey(JSON.parse(this.encrypt.CryptoJSAesDecrypt(this.encrypt.getKey(),ev.data)).newHash),console.log(JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).newHash);
    }),
      map((ev:any) => JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).data
      
        )
      );
  }

  getBase(url){
    var data = {
      '': ''
    };
    var key = this.encrypt.getKey();
    
    return this.http.get(this.apiUrl+ url +'?'+localStorage.getItem('user')+'='+this.encrypt.CryptoJSAesEncrypt(key, JSON.stringify(data))).pipe(tap((ev:any) => {this.encrypt.setKey(JSON.parse(this.encrypt.CryptoJSAesDecrypt(this.encrypt.getKey(),ev.data)).newHash);console.log(this.encrypt.getKey())}),
      map((ev:any) => JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).data
      
        )
      );

  }

  deleteBase(url,id){
    var data = {
      'id': id
    };
    var key = this.encrypt.getKey();
    
    return this.http.delete(this.apiUrl+ url +'?'+localStorage.getItem('user')+'='+this.encrypt.CryptoJSAesEncrypt(key, JSON.stringify(data))).pipe(tap((ev:any) => {this.encrypt.setKey(JSON.parse(this.encrypt.CryptoJSAesDecrypt(this.encrypt.getKey(),ev.data)).newHash);console.log(this.encrypt.getKey())}),
      map((ev:any) => JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).data
      
        )
      );

  }

  putBase(url,id,data){
    var body = {};
    data.urlId = id;
    var key = this.encrypt.getKey();
    body[localStorage.getItem('user')]= this.encrypt.CryptoJSAesEncrypt(key, JSON.stringify(data));
    return this.http.put(this.apiUrl+ url ,body).pipe(tap((ev:any) =>{this.encrypt.setKey(JSON.parse(this.encrypt.CryptoJSAesDecrypt(this.encrypt.getKey(),ev.data)).newHash),console.log(JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).newHash);
    }),
      map((ev:any) => JSON.parse(this.encrypt.CryptoJSAesDecrypt(key,ev.data)).data
      
        )
      );
  }
}
