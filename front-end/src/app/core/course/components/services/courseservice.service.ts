import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CourseserviceService {

  
  constructor(private _http: HttpClient) { }

  getAllData():Observable<any>{
    return this._http.get('http://localhost:8000/getAllCourse')
  }
  getSingleCourse(courseId:any):Observable<any>{
    return this._http.get('http://localhost:8000/getAllCourse/'+courseId)
  }
  createCourse(courseData:any):Observable<any>{
    return this._http.post('http://localhost:8000/createCourse',courseData)
  }
}
