import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Inventario } from '../../interfaces/inventario.interface';

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

  saveCategori(body: Category): Observable<Category> {
    const endpoint = `${this.base_url}/categories`;
    return this.http.post<Category>(endpoint, body);
  }

  updateCategaria(body: Category, id: number): Observable<Category> {
    const endpoint = `${this.base_url}/categories/${id}`;
    return this.http.put<Category>(endpoint, body);
  }

  eLiminarCategaria(id: number) {
    const endpoint = `${this.base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }

  getCategoryId(id: number) {
    const endpoint = `${this.base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }
}
