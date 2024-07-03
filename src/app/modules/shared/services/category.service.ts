import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  base_url: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  // getCategories(): Observable<any> {
  //   const endPoint = `${this.base_url}/categories`;
  //   return this.http.get<any>(endPoint);
  // }
  getCategories(): Observable<Inventario> {
    const endPoint = `${this.base_url}/categories`;
    return this.http.get<Inventario>(endPoint);
  }
}
