import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './course/components/courses-list/courses-list.component';
import { SingleCourseComponent } from './course/components/single-course/single-course.component';
import { QuizesListComponent } from './quiz/components/quizes-list/quizes-list.component';
import { SingleQuizComponent } from './quiz/components/single-quiz/single-quiz.component';
import { QuestionsListComponent } from './quiz/question/components/questions-list/questions-list.component';
import { SingleQuestionComponent } from './quiz/question/components/single-question/single-question.component';
import { SingleStudentComponent } from './student/components/single-student/single-student.component';
import { StudentsListComponent } from './student/components/students-list/students-list.component';
import { SingleTeacherComponent } from './teacher/components/single-teacher/single-teacher.component';
import { TeachersListComponent } from './teacher/components/teachers-list/teachers-list.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'courses-list',
    pathMatch: 'full'
  },
  {
    path:'courses-list',
    component: CoursesListComponent
  },
  {
    path:'single-course',
    component: SingleCourseComponent
  },
  {
    path:'students-list',
    component: StudentsListComponent
  },
  {
    path:'single-student',
    component: SingleStudentComponent
  },
  {
    path:'teachers-list',
    component: TeachersListComponent
  },
  {
    path:'single-teacher',
    component: SingleTeacherComponent
  },
  {
    path:'quizes-list',
    component: QuizesListComponent
  },
  {
    path:'single-quiz',
    component: SingleQuizComponent
  },
  {
    path:'questions-list',
    component: QuestionsListComponent
  },
  {
    path:'single-question',
    component: SingleQuestionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
