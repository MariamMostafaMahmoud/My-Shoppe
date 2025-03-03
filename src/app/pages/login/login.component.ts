import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false
  messageErr: string = ''
  SignIn: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-z]\w{7,}$/)])
  })

  submitform(): void {
    if (this.SignIn.valid) {
      this.isLoading = true;
      this.authService.SendDataLogin(this.SignIn.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            setTimeout(() => {
              localStorage.setItem('userToken',res.token)
              this.authService.saveUserData()
              this.router.navigate(['/home'])
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.messageErr = err.error.message;
        }
      })
    } else {
      this.SignIn.markAllAsTouched()
    }
  }
}