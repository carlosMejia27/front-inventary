import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category, Inventario } from '../../../interfaces/inventario.interface';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-catery',
  templateUrl: './catery.component.html',
  styleUrl: './catery.component.css',
})
export class CateryComponent implements OnInit {
  ngOnInit(): void {
    this.getCategory();
  }
  cabeceraFilaTitulosTabla: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  private categoryService = inject(CategoryService);

  getCategory(): void {
    this.categoryService.getCategories().subscribe(
      (data: Inventario) => {
        console.log(data);
        this.processCategoryResponse(data);
      },
      (error: Inventario) => {
        console.log(error);
      }
    );
  }

  processCategoryResponse(res: Inventario) {
    const dataCategory: Category[] = [];
    if (res.metadatos[0].code == '00') {
      let listCategories = res.categoriaResponse.categories;

      listCategories.forEach((element: Category) => {
        dataCategory.push(element);
        this.dataSource = new MatTableDataSource<Category>(dataCategory);
      });
    }
  }
}
