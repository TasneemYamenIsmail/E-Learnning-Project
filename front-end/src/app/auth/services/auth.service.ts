import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(public http:HttpClient) { }

  public register(user: User):Observable<User>{
    return this.http.post<User>('http://localhost:8000/register',user)
  }

  public login(user: Partial<User>):Observable<any>{
    return this.http.post('http://localhost:8000/login',user)
  }

  public activate(userId: string):Observable<any>{
    return this.http.get(`http://localhost:8000/activate/${userId}`)
  }

  public logout():Observable<any>{
    return this.http.post('http://localhost:8000/logout','');
  }
}
