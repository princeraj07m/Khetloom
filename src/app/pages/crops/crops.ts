import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

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

  form: any = {
    name: '',
    type: '',
    field: '',
    plantingDate: ''
  };
  isEditing = false;
  currentId: string | null = null;

  modal: any; // Bootstrap modal instance

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCrops();

    // Initialize Bootstrap modal
    const modalEl = document.getElementById('cropModal');
    if (modalEl) this.modal = new bootstrap.Modal(modalEl);
  }

  loadCrops(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.api.getCrops().subscribe({
      next: (res: any) => {
        this.crops = res.crops || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load crops';
        this.isLoading = false;
      }
    });
  }

  openCreate(): void {
    this.isEditing = false;
    this.currentId = null;
    this.form = { name: '', type: '', field: '', plantingDate: '' };
    this.modal.show();
  }

  openEdit(item: any): void {
    this.isEditing = true;
    this.currentId = item._id || item.id || null;
    this.form = {
      name: item.name || '',
      type: item.type || '',
      field: item.field || '',
      plantingDate: item.plantingDate ? String(item.plantingDate).substring(0,10) : ''
    };
    this.modal.show();
  }

  save(): void {
    const payload = { ...this.form };
    if (this.isEditing && this.currentId) {
      this.api.updateCrop(this.currentId, payload).subscribe({
        next: () => {
          this.modal.hide();
          this.loadCrops();
        },
        error: (err) => { alert(err.message || 'Update failed'); }
      });
    } else {
      this.api.createCrop(payload).subscribe({
        next: () => {
          this.modal.hide();
          this.loadCrops();
        },
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

  cancel(): void {
    this.modal.hide();
    this.isEditing = false;
    this.currentId = null;
    this.form = { name: '', type: '', field: '', plantingDate: '' };
  }
}
