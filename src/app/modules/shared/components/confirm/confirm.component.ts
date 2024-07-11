import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductsService);
  private dialogoRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  onNoClick() {
    this.dialogoRef.close(3);
  }

  delete() {
    if (this.data != null) {
      if (this.data.module == 'category') {
        this.categoryService.eLiminarCategaria(this.data.id).subscribe(
          (data) => {
            this.dialogoRef.close(1);
          },
          (error: any) => {
            this.dialogoRef.close(2);
          }
        );
      } else if (this.data.module == 'product') {
        this.productService.deleteProduct(this.data.id).subscribe(
          (data) => {
            this.dialogoRef.close(1);
          },
          (error: any) => {
            this.dialogoRef.close(2);
          }
        );
      }
    } else {
      this.dialogoRef.close(2);
    }
  }
}
