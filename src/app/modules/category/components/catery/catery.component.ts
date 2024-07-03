import { Component, inject, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Category, Inventario } from '../../../interfaces/inventario.interface';
import { CategoryService } from '../../../shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-catery',
  templateUrl: './catery.component.html',
  styleUrl: './catery.component.css',
})
export class CateryComponent implements OnInit {
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

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

  openCatalogoDialogo() {
    const dialogRefAbierto = this.dialog.open(NewCategoryComponent, {
      // width: '450px',
    });

    dialogRefAbierto.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.openSnackBarMensajes('Categoria Agregada', 'existosa');
        this.getCategory();
      } else if (result == 2) {
        this.openSnackBarMensajes('se Produjo un error', 'error');
      }
    });
  }

  openSnackBarMensajes(
    msj: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(msj, action, {
      duration: 2000,
    });
  }

  edit(id: number, name: string, descripcion: string) {
    const dialogRefAbierto = this.dialog.open(NewCategoryComponent, {
      // width: '450px',
      data: { id: id, name: name, descripcion: descripcion },
    });

    dialogRefAbierto.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.openSnackBarMensajes('Categoria Actualizada', 'existosa');
        this.getCategory();
      } else if (result == 2) {
        this.openSnackBarMensajes('No se pudo actualizar', 'error');
      }
    });
  }
}
