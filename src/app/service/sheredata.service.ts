import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheredataService {
   

  private apiUrl = 'http://localhost:3000/posts/';
  constructor(private _http:HttpClient) { };

  getPosts(): Observable<any> {
    return this._http.get(this.apiUrl);
  };

  addPost(post: any): Observable<any> {
    return this._http.post(this.apiUrl, post);
  };


  updatePost(post: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${post.id}`, post);
  }



  deletePost(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

}
