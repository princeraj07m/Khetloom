import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('🚀 Login form submitted');
    console.log('📝 Form valid:', this.loginForm.valid);
    console.log('📋 Form value:', this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const credentials = this.loginForm.value;
      console.log('🔐 Sending credentials to auth service:', credentials);
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('✅ Login successful:', response);
          alert('Login Successful!');
          this.authService.navigateToDashboard();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Login failed. Please try again.';
          console.error('❌ Login error:', error);
          console.error('❌ Error message:', error.message);
        }
      });
    } else {
      this.markFormGroupTouched();
      console.log('❌ Form is invalid');
      alert('Please enter valid credentials.');
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }
}