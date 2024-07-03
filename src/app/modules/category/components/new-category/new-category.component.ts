import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../../interfaces/inventario.interface';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent implements OnInit {
  estadoFormulario: string = '';
  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private serviciocategoria = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.estadoFormulario = 'Agregar';

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  OnSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value,
    };

    if (this.data != null) {
      this.serviciocategoria.updateCategaria(data, this.data.id).subscribe(
        (data: Category) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
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
  }

  OnCancel() {
    this.dialogRef.close(3);
  }
  updateForm(datos: Category) {
    this.categoryForm = this.fb.group({
      name: [datos.name, Validators.required],
      descripcion: [datos.descripcion, Validators.required],
    });
  }
}
