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
    // console.log('🚀 Login form submitted');
    // console.log('📝 Form valid:', this.loginForm.valid);
    // console.log('📋 Form value:', this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const credentials = this.loginForm.value;
      // console.log('🔐 Sending credentials to auth service:', credentials);
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          // console.log('✅ Login successful:', response);
          // console.log('🎉 Full response object:', JSON.stringify(response, null, 2));
          alert('Login Successful! Redirecting to dashboard...');
          this.authService.navigateToDashboard();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Login failed. Please try again.';
          // console.error('❌ Login error:', error);
          // console.error('❌ Error message:', error.message);
          // console.error('❌ Full error object:', JSON.stringify(error, null, 2));
          alert(`Login failed: ${this.errorMessage}`);
        }
      });
    } else {
      this.markFormGroupTouched();
      // console.log('❌ Form is invalid');
      // console.log('❌ Form errors:', this.getFormErrors());
      alert('Please enter valid credentials.');
    }
  }

  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
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