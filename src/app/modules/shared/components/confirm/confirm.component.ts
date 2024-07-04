import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent {
  private categoryService = inject(CategoryService);
  private dialogoRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  onNoClick() {
    this.dialogoRef.close(3);
  }

  delete() {
    if (this.data != null) {
      this.categoryService.eLiminarCategaria(this.data.id).subscribe(
        (data) => {
          this.dialogoRef.close(1);
        },
        (error: any) => {
          this.dialogoRef.close(2);
        }
      );
    } else {
      this.dialogoRef.close(2);
    }
  }
}
