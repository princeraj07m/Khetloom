import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crops',
  standalone: false,
  templateUrl: './crops.html',
  styleUrls: ['./crops.scss']
})
export class Crops implements OnInit {
  crops: any[] = [];
  isLoading = false;
  errorMessage = '';

  formVisible = false;
  isEditing = false;
  currentId: string | null = null;
  form: any = {
    name: '',
    type: '',
    field: '',
    plantingDate: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadCrops(); }

loadCrops(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.api.getCrops().subscribe({
    next: (res: any) => {
      this.crops = res.crops || [];   // ✅ take the crops array
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = err.message || 'Failed to load crops';
      this.isLoading = false;
    }
  });
}



  openCreate(): void {
    this.formVisible = true;
    this.isEditing = false;
    this.currentId = null;
    this.form = { name: '', type: '', field: '', plantingDate: '' };
  }

  openEdit(item: any): void {
    this.formVisible = true;
    this.isEditing = true;
    this.currentId = item._id || item.id;
    this.form = {
      name: item.name || '',
      type: item.type || '',
      field: item.field || '',
      plantingDate: (item.plantingDate ? String(item.plantingDate).substring(0,10) : '')
    };
  }

  cancel(): void { this.formVisible = false; this.isEditing = false; this.currentId = null; }

  save(): void {
    const payload = { ...this.form };
    if (this.isEditing && this.currentId) {
      this.api.updateCrop(this.currentId, payload).subscribe({
        next: () => { this.formVisible = false; this.loadCrops(); },
        error: (err) => { alert(err.message || 'Update failed'); }
      });
    } else {
      this.api.createCrop(payload).subscribe({
        next: () => { this.formVisible = false; this.loadCrops(); },
        error: (err) => { alert(err.message || 'Create failed'); }
      });
    }
  }

  remove(item: any): void {
    const id = item._id || item.id;
    if (!id) return;
    if (!confirm('Delete this crop?')) return;
    this.api.deleteCrop(id).subscribe({
      next: () => this.loadCrops(),
      error: (err) => { alert(err.message || 'Delete failed'); }
    });
  }
}


