import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss'
})
export class Analytics implements OnInit {
  appData: any = null;
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAppData();
  }

  loadAppData() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.apiService.getAppData().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.appData = response;
          console.log('App data loaded:', this.appData);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Failed to load app data';
        console.error('Error loading app data:', error);
      }
    });
  }

  refreshData() {
    this.loadAppData();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  getObjectValues(obj: any): any[] {
    return Object.values(obj || {});
  }
}