export interface Inventario {
  metadatos: Metadato[];
  categoriaResponse: CategoriaResponse;
}

export interface CategoriaResponse {
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  descripcion: string;
}

export interface Metadato {
  code: string;
  data: string;
  type: string;
}
