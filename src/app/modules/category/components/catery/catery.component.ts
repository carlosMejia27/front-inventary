import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Category, Inventario } from '../../../interfaces/inventario.interface';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { CategoryService } from '../../../shared/services/category.service';
import { UtilService } from '../../../shared/services/util.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-catery',
  templateUrl: './catery.component.html',
  styleUrl: './catery.component.css',
})
export class CateryComponent implements OnInit {
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private utilService = inject(UtilService);
  isAdmin: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getCategory();
    this.isAdmin = this.utilService.isAdmin();
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
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  openCatalogoDialogo() {
    const dialogRefAbierto = this.dialog.open(NewCategoryComponent, {
      // width: '450px',
    });

    dialogRefAbierto.afterClosed().subscribe((result: any) => {
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

    dialogRefAbierto.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBarMensajes('Categoria Actualizada', 'existosa');
        this.getCategory();
      } else if (result == 2) {
        this.openSnackBarMensajes('No se pudo actualizar', 'error');
      }
    });
  }

  delete(id: number) {
    const dialogRefAbierto = this.dialog.open(ConfirmComponent, {
      // width: '450px',
      data: { id: id, module: 'category' },
    });

    dialogRefAbierto.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBarMensajes('Categoria Borrada', 'existosa');
        this.getCategory();
      } else if (result == 2) {
        this.openSnackBarMensajes('No se pudo Borrar', 'error');
      }
    });
  }

  buscar(termino: any) {
    if (termino.length === 0) {
      return this.getCategory();
    } else {
      this.categoryService.getCategoryId(termino).subscribe((resp: any) => {
        this.processCategoryResponse(resp);
      });
    }
  }
}
