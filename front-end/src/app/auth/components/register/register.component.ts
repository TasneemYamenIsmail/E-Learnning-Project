import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPassword, matchRole, validatePassword } from '../../helpers/auth.helper';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isLoading = false;
  public error!: { error: { data: string; }; };
  public roles = ['Teacher', 'Student']

  @ViewChild('registerNgForm', { static: true })
  public registerNgForm!: NgForm;


  public registerForm:FormGroup = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    phone:['', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password:['', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)]],
    confirmPassword:['', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)]],
    role:['Student', [Validators.required, matchRole]],
    tags:'',
  } ,
  {
      validator: [matchPassword('password', 'confirmPassword'),validatePassword()]
  }
  )

  public constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    ) { }

  public ngOnInit() {
  }

  public register() {
    console.log(this.registerForm);
    console.log(this.registerForm.errors);

    if(this.registerForm.valid  && !this.isLoading) {
      this.isLoading= true;
      let tags = this.registerForm.getRawValue().tags
      const user = new User(this.registerForm.getRawValue())
      tags = tags.split(',').map((tag:any)=>{
        return {tag}
      })

      this.authService.register({...user, tags}).subscribe(
        (data)=>{
          console.log('data:',data);
          this.isLoading= false;
        },
        (err)=>{
          this.error=err;
          console.log('err:',err);
        },
        ()=>{
          console.log('done:');
          this.router.navigate(['/auth/login'])
        }
      )
    } else {
      this.registerForm.markAsDirty();
      this.isLoading= false;
    }

  }


  get registerFormControl(): {
    [key: string]: AbstractControl|any;
} {
    return this.registerForm.controls;
  }

}

