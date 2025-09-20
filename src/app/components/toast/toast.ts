import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../services/toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => *', animate('300ms ease-in-out')),
      transition('* => void', animate('300ms ease-in-out'))
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: Toast | null = null;
  private readonly subscription: Subscription = new Subscription();
  private timeoutId: any;

  constructor(private readonly toastService: ToastService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.toastService.toast$.subscribe(toast => {
        this.toast = toast;
        if (toast) {
          // Clear any existing timeout
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
          // Set new timeout to hide toast
          this.timeoutId = setTimeout(() => {
            this.toast = null;
          }, 3000);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  getToastClass() {
    if (!this.toast) {
      return '';
    }
    return `toast-${this.toast.type}`;
  }

  closeToast() {
    this.toast = null;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}