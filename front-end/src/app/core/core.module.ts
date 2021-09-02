import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCourseComponent } from './course/components/single-course/single-course.component';
import { CoursesListComponent } from './course/components/courses-list/courses-list.component';
import { SingleQuizComponent } from './quiz/components/single-quiz/single-quiz.component';
import { QuizesListComponent } from './quiz/components/quizes-list/quizes-list.component';
import { SingleQuestionComponent } from './quiz/question/components/single-question/single-question.component';
import { QuestionsListComponent } from './quiz/question/components/questions-list/questions-list.component';
import { SingleStudentComponent } from './student/components/single-student/single-student.component';
import { StudentsListComponent } from './student/components/students-list/students-list.component';
import { SingleTeacherComponent } from './teacher/components/single-teacher/single-teacher.component';
import { TeachersListComponent } from './teacher/components/teachers-list/teachers-list.component';
import { CoreLayoutComponent } from './core-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from '../layout/footer/footer.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { CreatecourseComponent } from './course/components/createcourse/createcourse.component';



@NgModule({
  declarations: [
    SingleCourseComponent,
    CoursesListComponent,
    SingleQuizComponent,
    QuizesListComponent,
    SingleQuestionComponent,
    QuestionsListComponent,
    SingleStudentComponent,
    StudentsListComponent,
    SingleTeacherComponent,
    TeachersListComponent,
    CoreLayoutComponent,
    NavbarComponent,
    FooterComponent,
    CreatecourseComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports:[
    CoreLayoutComponent
  ]
})
export class CoreModule { }
