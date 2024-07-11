import { CategoriaResponse } from './../../interfaces/inventario.interface';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../../shared/services/products.service';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../interfaces/inventario.interface';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css',
})
export class NewProductsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductsService);
  private servicioCategoria = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public productsForm!: FormGroup;
  estadoFormulario: string = '';
  categories: Category[] = [];
  nameImage: String = '';
  selectedFile: any;

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      precio: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
    });
    this.estadoFormulario = 'Agregar';
    this.getCategory();
  }

  OnCancel() {
    this.dialogRef.close(3);
  }

  OnSave() {
    let data = {
      name: this.productsForm.get('name')?.value,
      precio: this.productsForm.get('precio')?.value,
      account: this.productsForm.get('account')?.value,
      category: this.productsForm.get('category')?.value,
      picture: this.selectedFile,
    };
    const updateImageData = new FormData();
    updateImageData.append('picture', data.picture, data.picture.name);
    updateImageData.append('name', data.name);
    updateImageData.append('precio', data.precio);
    updateImageData.append('account', data.account);
    updateImageData.append('category', data.category);

    // Iterar sobre el FormData para verificar su contenido
    // updateImageData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    // llamamos al servicio
    this.productService.save(updateImageData).subscribe(
      (response) => {
        this.dialogRef.close(1);
      },
      (error) => {
        this.dialogRef.close(2);
      }
    );
  }

  getCategory() {
    this.servicioCategoria.getCategories().subscribe((data: any) => {
      this.categories = data.categoriaResponse.categories;
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
      this.nameImage = input.files[0].name;
    }
  }
}
