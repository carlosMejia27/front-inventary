import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioProducto, ProductElement } from '../../interfaces/products';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
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
}
