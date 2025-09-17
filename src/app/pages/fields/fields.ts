import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-fields',
  standalone: false,
  templateUrl: './fields.html',
  styleUrls: ['./fields.scss']
})
export class Fields implements OnInit {
  fields: any[] = [];
  isLoading = false;
  errorMessage = '';

  formVisible = false;
  isEditing = false;
  currentId: string | null = null;
  form: any = {
    name: '',
    location: '',
    size: null,
    crop: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadFields(); }

  loadFields(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.api.getFields().subscribe({
      next: (list) => { this.fields = list || []; this.isLoading = false; },
      error: (err) => { this.isLoading = false; this.errorMessage = err.message || 'Failed to load fields'; }
    });
  }

  openCreate(): void {
    this.formVisible = true;
    this.isEditing = false;
    this.currentId = null;
    this.form = { name: '', location: '', size: null, crop: '' };
  }

  openEdit(item: any): void {
    this.formVisible = true;
    this.isEditing = true;
    this.currentId = item._id || item.id;
    this.form = {
      name: item.name || '',
      location: item.location || '',
      size: item.size || null,
      crop: item.crop || ''
    };
  }

  cancel(): void { this.formVisible = false; this.isEditing = false; this.currentId = null; }

  save(): void {
    const payload = { ...this.form };
    if (this.isEditing && this.currentId) {
      this.api.updateField(this.currentId, payload).subscribe({
        next: () => { this.formVisible = false; this.loadFields(); },
        error: (err) => { alert(err.message || 'Update failed'); }
      });
    } else {
      this.api.createField(payload).subscribe({
        next: () => { this.formVisible = false; this.loadFields(); },
        error: (err) => { alert(err.message || 'Create failed'); }
      });
    }
  }

  remove(item: any): void {
    const id = item._id || item.id;
    if (!id) return;
    if (!confirm('Delete this field?')) return;
    this.api.deleteField(id).subscribe({
      next: () => this.loadFields(),
      error: (err) => { alert(err.message || 'Delete failed'); }
    });
  }
}


