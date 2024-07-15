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
import { Category } from '../../interfaces/inventario.interface';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

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
  private utilService = inject(UtilService);
  isAdmin: any;

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
    this.isAdmin = this.utilService.isAdmin();
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
      let listProducts = resp.product.products;

      listProducts.forEach((element: ProductElement) => {
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });

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

  edit(
    id: number,
    name: string,
    precio: number,
    account: number,
    category: Category
  ) {
    const dialogRefAbierto = this.dialog.open(NewProductsComponent, {
      // width: '450px',
      data: {
        id: id,
        name: name,
        price: precio,
        account: account,
        categoryId: category,
      },
    });

    dialogRefAbierto.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBarMensajes('producto editado', 'existosa');
        this.getProduct();
      } else if (result == 2) {
        this.openSnackBarMensajes('se Produjo un error al editarlo ', 'error');
      }
    });
  }

  deleteproducts(id: any) {
    const dialogRefAbierto = this.dialog.open(ConfirmComponent, {
      // width: '450px',
      data: { id: id, module: 'product' },
    });

    dialogRefAbierto.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBarMensajes('producto eliminado', 'existosa');
        this.getProduct();
      } else if (result == 2) {
        this.openSnackBarMensajes(
          'se Produjo un error al eliminar producto ',
          'error'
        );
      }
    });
  }

  buscarProducto(nombre: any) {
    if (nombre.length === 0) {
      return this.getProduct();
    }

    this.productsService.getProductByName(nombre).subscribe((resp: any) => {
      this.processProductos(resp);
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
