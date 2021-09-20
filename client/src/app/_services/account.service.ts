import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  //就像个缓冲文件， 1 定义我们只需要一个
private currentUserSoure = new ReplaySubject<User>(1);

currentUser$ = this.currentUserSoure.asObservable();


  constructor(private http: HttpClient) {}
  login(model: any) {
    // <User> 这里我和Neil 的不一样，有些和我一样报错了,参看question 后解决， Angiular 11 ,要求更严格 ， 我们可以在tsconfig。json里面吧strict 改成false。
    return this.http.post(this.baseUrl + 'account/login', model).pipe(map((response: User )=>{
      const user = response;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        //当Observable产生一个新值时，会通知 observer 的 next()，而当捕获失败可以调用 error()。
        this.currentUserSoure.next(user);
      }
    }))
  }

register(model:any){
  return this.http.post(this.baseUrl + 'account/register', model).pipe(map((user: User) =>{
    if(user){
localStorage.setItem('user',JSON.stringify(user));
this.currentUserSoure.next(user);
    }
    return user;
  }))
}

  setCurrentUser(user : User){
    this.currentUserSoure.next(user);

  }
logout(){
  localStorage.removeItem('user');
  this.currentUserSoure.next(null);

}


}


