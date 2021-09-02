import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function  validatePassword():any{
  return (formGroup: FormGroup) => {
    const pass = formGroup.value.password.toLowerCase().trim();
    const confirmPass = formGroup.value.confirmPassword?formGroup.value.confirmPassword.toLowerCase().trim():'';
    const name = formGroup.value.name?formGroup.value.name.toLowerCase().trim():'';
    const email = formGroup.value.email.toLowerCase().trim()

    if ( pass.includes('123') ||
          pass.includes('pass') ||
          pass.includes('password') ||
          (name!=='' &&pass.includes(name)) ||
          pass.includes(email) ||
          ( confirmPass!=='' &&
          (confirmPass.includes('123') ||
          confirmPass.includes('pass') ||
          confirmPass.includes('password') ||
          confirmPass.includes(name) ||
          confirmPass.includes(email)))
      ) {

      return { invalidPassword: true };
    }
    return null;
  }

}


export function matchPassword(password: string, confirmPassword: string):any {
  return (formGroup: any) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
    return null
  }
}

export function matchRole(control: AbstractControl): ValidationErrors | null{
  const value =  control.value.toLowerCase().trim();
  if(value&&(value!=="teacher" && value!=="student")){
    return { misMatch : true }
  }
  return null;
}


