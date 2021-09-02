import { Component, OnInit } from '@angular/core';
import { CourseserviceService } from '../services/courseservice.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  allCourse:any[] = []
  constructor(private _course:CourseserviceService) {
  _course.getAllData().subscribe( 
    (data) => {console.log(data); this.allCourse = data.data} ,
    ( e ) => { console.log('error'); console.log(e); },
    ( ) => { console.log('then'); }
  )
}
 
ngOnInit(): void {
  this.getAllcourse()
}

getAllcourse(){
  this._course.getAllData().subscribe(data=>{
    this.allCourse = data.data
  },
  ()=>{},
  ()=>{}
  )
}
}
