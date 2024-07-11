import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioProducto } from '../../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  base_url: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getPrduct(): Observable<InventarioProducto> {
    const endPoint = `${this.base_url}/products`;
    return this.http.get<InventarioProducto>(endPoint);
  }

  // save(body: InventarioProducto) {
  //   const endPoint = `${this.base_url}/products`;
  //   return this.http.post<InventarioProducto>(endPoint, body);
  // }

  save(body: any) {
    const endPoint = `${this.base_url}/products`;
    return this.http.post(endPoint, body);
  }

  updateProduct(body: any, id: any) {
    const endPoint = `${this.base_url}/products/${id}`;
    return this.http.put(endPoint, body);
  }

  deleteProduct(id: any) {
    const endPoint = `${this.base_url}/products/${id}`;
    return this.http.delete(endPoint);
  }

  getProductByName(name: any) {
    const endPoint = `${this.base_url}/products/filter/${name}`;
    return this.http.get(endPoint);
  }
}
