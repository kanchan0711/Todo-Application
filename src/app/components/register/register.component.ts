import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  passwordVisible = false;
  passwordFieldType = 'password';

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  navigate(param: string): void {
    this.router.navigate([param]);
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.saveUserDataToLocalStorage(userData);
      this.showSuccessNotification('Registration successful');
      this.navigateTo('login');
    } else {
      this.showErrorNotification(
        'Registration failed. Please check your input.'
      );
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  private saveUserDataToLocalStorage(userData: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  }

  private showSuccessNotification(message: string) {
    this.notificationService.showSuccess(message);
  }

  private showErrorNotification(message: string) {
    this.notificationService.showError(message);
  }
}
