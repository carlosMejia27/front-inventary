import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../interfaces/inventario.interface';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent implements OnInit {
  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private serviciocategoria = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  OnSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      descripcion: this.categoryForm.get('description')?.value,
    };
    this.serviciocategoria.saveCategori(data).subscribe(
      (data: Category) => {
        // console.log(data);
        this.dialogRef.close(1);
      },
      (error: Category) => {
        this.dialogRef.close(2);
      }
    );
  }

  OnCancel() {
    this.dialogRef.close(3);
  }
}
