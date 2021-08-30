import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  public error:{error:{data:string}}

  public registerForm:FormGroup;
  @ViewChild('registerNgForm',{static: true}) public registerNgForm:NgForm

  public constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    ) { }

  public ngOnInit() {
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
      password:['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)]],
      confirmPassword:['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)]],
      role:['', [Validators.required, matchRole]],
      tag:[],
    } ,
    {
        validator: [matchPassword('password', 'confirmPassword'),validatePassword()]
    }
    )
  }

  public register() {
    console.log(this.registerForm);
    console.log(this.registerForm.errors);

    if(this.registerForm.valid  && !this.isLoading) {
      this.isLoading= true;
      const user = new User(this.registerForm.getRawValue())
      console.log('user:',user);
      this.authService.register(user).subscribe(
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
    [key: string]: AbstractControl;
} {
    return this.registerForm.controls;
  }

}

