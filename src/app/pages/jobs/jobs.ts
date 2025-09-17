import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-jobs',
  standalone: false,
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.scss']
})
export class Jobs implements OnInit {
  jobs: any[] = [];
  isLoading = false;
  errorMessage = '';

  formVisible = false;
  isEditing = false;
  currentId: string | null = null;
  form: any = {
    title: '',
    description: '',
    status: 'pending'
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadJobs(); }

  loadJobs(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.api.getJobs().subscribe({
      next: (list) => { this.jobs = list || []; this.isLoading = false; },
      error: (err) => { this.isLoading = false; this.errorMessage = err.message || 'Failed to load jobs'; }
    });
  }

  openCreate(): void {
    this.formVisible = true;
    this.isEditing = false;
    this.currentId = null;
    this.form = { title: '', description: '', status: 'pending' };
  }

  openEdit(item: any): void {
    this.formVisible = true;
    this.isEditing = true;
    this.currentId = item._id || item.id;
    this.form = {
      title: item.title || '',
      description: item.description || '',
      status: item.status || 'pending'
    };
  }

  cancel(): void { this.formVisible = false; this.isEditing = false; this.currentId = null; }

  save(): void {
    const payload = { ...this.form };
    if (this.isEditing && this.currentId) {
      this.api.updateJob(this.currentId, payload).subscribe({
        next: () => { this.formVisible = false; this.loadJobs(); },
        error: (err) => { alert(err.message || 'Update failed'); }
      });
    } else {
      this.api.createJob(payload).subscribe({
        next: () => { this.formVisible = false; this.loadJobs(); },
        error: (err) => { alert(err.message || 'Create failed'); }
      });
    }
  }

  remove(item: any): void {
    const id = item._id || item.id;
    if (!id) return;
    if (!confirm('Delete this job?')) return;
    this.api.deleteJob(id).subscribe({
      next: () => this.loadJobs(),
      error: (err) => { alert(err.message || 'Delete failed'); }
    });
  }
}


