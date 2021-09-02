import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseserviceService } from '../services/courseservice.service';
// import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.scss']
})
export class CreatecourseComponent implements OnInit {

  myData:any
  constructor(private toastr: ToastrService,  private _course:CourseserviceService, private _router:Router) { }

  ngOnInit(): void {
    // this._data.me().subscribe(data => {
    //   this.myData = data
    // })
  }

  myForm  = new FormGroup({
    name:new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    content:new FormControl('', [Validators.required, Validators.minLength(3)]),
    courseContent:new FormControl('', [Validators.required, Validators.minLength(3)]),
    totalHours:new FormControl('', [Validators.required, Validators.min(10) , Validators.max(80)]),
    teacherId:new FormControl('', [Validators.required]),
    quizId:new FormControl('', [Validators.required])
    // courseContent:new FormControl('', [Validators.required, Validators.)
    })

    get name(){return this.myForm.get('name')}
    get content(){return this.myForm.get('content')}
    get courseContent(){return this.myForm.get('courseContent')}
    get totalHours(){return this.myForm.get('totalHours')}
    get teacherId(){return this.myForm.get('teacherId')}
    get quizId(){return this.myForm.get('quizId')}
    // get courseContent(){return this.myForm.get('courseContent')}

    handleSubmit(courseData:any){
      this._course.createCourse(courseData.value).subscribe(data =>{
        console.log(data)
        this.toastr.success('Data Added Successfully', 'Course Created!');
        this._router.navigateByUrl('/course')
      },
         (e)=>{},
         ()=>{
         }
         )
      }
  
}
