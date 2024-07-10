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
}
