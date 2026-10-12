export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  existencia: number;
}

export interface DetalleAgregar {
  id: string;
  nombre: string;
  precio: number;
}