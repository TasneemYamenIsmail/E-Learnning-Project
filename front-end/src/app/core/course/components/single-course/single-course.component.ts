import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseserviceService } from '../services/courseservice.service'; 
@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent implements OnInit {

  course:any
  courseData :any = {name:""}
  constructor(private _course:CourseserviceService, private _r:ActivatedRoute) { }

  ngOnInit(): void {
    // this.courseData=this._course.getAllData().subscribe(data => {
    //   this.courseData = data.data
    //   console.log(this.courseData)
    // })
    this.getSingleCourse()
    
  }

  myForm  = new FormGroup({
    name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    // content:new FormControl('', [Validators.required, Validators.minLength(3)]),
    // courseContent:new FormControl('', [Validators.required, Validators.minLength(3)]),
    // totalHours:new FormControl('', [Validators.required, Validators.min(10) , Validators.max(80)]),
    // teacherId:new FormControl('', [Validators.required]),
    // quizId:new FormControl('', [Validators.required])
    })

    get name(){return this.myForm.get('name')}
    // get content(){return this.myForm.get('content')}
    // get courseContent(){return this.myForm.get('courseContent')}
    // get totalHours(){return this.myForm.get('totalHours')}
    // get teacherId(){return this.myForm.get('teacherId')}
    // get quizId(){return this.myForm.get('quizId')}


    handleEdit(){
      console.log(this.courseData)

    }

    getSingleCourse(){
      this._course.getSingleCourse(this._r.snapshot.params.id).subscribe(data=>{
         this.course=data.data
         console.log(data)
         this.myForm.setValue({'name': data.data.name})
     })
   }
}
