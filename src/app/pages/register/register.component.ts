import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router=inject(Router)
 
  isLoading:boolean = false;
  messageErr!:string

  SignUp: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-z]\w{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword);

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const ConfirmPassword = group.get('rePassword')?.value;
    return password === ConfirmPassword ? null : { mismatch: true }
  }
  submitform(): void {
    if (this.SignUp.valid) {
      this.isLoading = true;
      this.authService.SendDataSignUp(this.SignUp.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.router.navigate(['/login'])
          }
          this.isLoading = false;
          this.messageErr = ''
        },
        error: (err) => {
          this.isLoading = false;
          this.messageErr=err.error.message;
        }
      }
      )
    }else{
      this.SignUp.markAllAsTouched()
    }
  }



}
