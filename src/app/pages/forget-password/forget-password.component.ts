import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  Step: number = 1;
  isLoading: boolean = false
  verfiyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verfiyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  })
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-z]\w{7,}$/)])
  })

  sendEmail(): void {
    if (this.verfiyEmail.valid) {
      this.isLoading = true;
      this.authService.VerfiyEmail(this.verfiyEmail.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.statusMsg === 'success') {
            this.Step = 2
          }
          this.isLoading = false;

        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }
  sendCode(): void {
    if (this.verfiyCode.valid) {
      console.log('hello', this.verfiyCode.valid)
      this.isLoading = true;
      this.authService.setCode(this.verfiyCode.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 'Success') {
            this.Step = 3
          }
          // console.log(res)
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err)
          this.isLoading = false;

        }
      })
    }
  }
  NewPass(): void {
    if (this.verfiyEmail.valid) {
      this.isLoading = true;
      this.authService.setNewPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem('userToken', res.token)
          this.authService.saveUserData()
          this.router.navigate(['/home'])
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
