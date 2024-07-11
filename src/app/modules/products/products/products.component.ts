import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioProducto, ProductElement } from '../../interfaces/products';
import { ProductsService } from '../../shared/services/products.service';
import { NewProductsComponent } from '../new-products/new-products.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // private productsService = inject(ProductsService);

  cabeceraFilaTitulosTabla: string[] = [
    'id',
    'name',
    'precio',
    'account',
    'category',
    'picture',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProductElement>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productsService.getPrduct().subscribe(
      (data: InventarioProducto) => {
        this.processProductos(data);
      },
      (error) => {
        console.log('Error al obtener productos', error);
      }
    );
  }

  processProductos(resp: InventarioProducto): void {
    const dataProduct: ProductElement[] = [];

    if (resp.metadatos[0].code === '00') {
      resp.product.products.forEach((product) => {
        // Aseguramos que product.category sea del tipo Category
        product.category = {
          id: product.category.id,
          name: product.category.name,
          descripcion: product.category.descripcion,
        };

        // Asignación correcta de la imagen en formato Base64
        product.picture = 'data:image/jpeg;base64,' + product.picture;
        dataProduct.push(product);
      });

      // Asignamos el nuevo datasource y configuramos el paginador
      // this.dataSource.data = dataProduct;
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialogo() {
    const dialogRefAbierto = this.dialog.open(NewProductsComponent, {
      // width: '450px',
    });

    dialogRefAbierto.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBarMensajes('Categoria Agregada', 'existosa');
        this.getProduct();
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
}
