import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePassword } from '../../helpers/auth.helper';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = false;
  public error!: { error: { data: string; }; };

  @ViewChild('loginNgForm', { static: true })
  public loginNgForm!: NgForm;


  loginForm : FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)]],
  },
  {
    validator: [validatePassword()]
}
  )

  public constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    ) { }

  ngOnInit() {
  }

  get loginFormControl(): {
    [key: string]: AbstractControl;
} {
    return this.loginForm.controls;
  }

  public login() {

    if(this.loginForm.valid  && !this.isLoading) {
      this.isLoading= true;
      const user = this.loginForm.getRawValue()
      console.log('user:',user);

      this.authService.login(user).subscribe(
        (res)=>{
          console.log('res:',res);
          localStorage.setItem('myToken', res.data.token)
          this.isLoading= false;
        },
        (err)=>{
          this.error=err;
          console.log('err:',err);
        },
        ()=>{
          console.log('done:');
          this.router.navigate(['/main'])
        }
      )
    } else {
      this.loginForm.markAsDirty();
      this.isLoading= false;
    }

  }

}
