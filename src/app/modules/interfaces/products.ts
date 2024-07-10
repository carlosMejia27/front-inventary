export interface InventarioProducto {
  metadatos: Metadato[];
  product: InventarioProductoProduct;
}

export interface Metadato {
  code: string;
  data: string;
  type: string;
}

export interface InventarioProductoProduct {
  products: ProductElement[];
}

export interface ProductElement {
  id: number;
  name: string;
  precio: number;
  account: number;
  category: Category;
  picture: Blob | string;
}

export interface Category {
  id: number;
  name: string;
  descripcion: string;
}
