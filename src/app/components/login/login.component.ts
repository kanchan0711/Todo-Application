import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible = false;
  passwordFieldType = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['mehtab@gmail.com', [Validators.required, Validators.email]],
      password: ['123456789', [Validators.required, Validators.minLength(4)]],
    });
  }

  navigate(param: string): void {
    this.router.navigate([param]);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email === 'mehtab@gmail.com' && password === '123456789') {
        this.notificationService.showSuccess('Login successful');
        this.router.navigate(['dashboard']);
      } else {
        this.notificationService.showError('Invalid email or password');
      }
    } else {
      console.error('Form is null');
    }
  }
}
