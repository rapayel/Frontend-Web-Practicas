import api from '../api';

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  existencia: number;
}

export interface PedidoPayload {
  correo: string;
  telefono: string;
  productos: string[];
}

export interface PedidoRespuesta {
  folio: string;
  total: number;
}

export const getProducts = async (): Promise<Producto[]> => {
  const response = await api.get('/productos');
  return response.data.data;
};

export const createOrder = async (orderData: PedidoPayload): Promise<PedidoRespuesta> => {
  const response = await api.post('/pedidos', orderData);
  return response.data.data;
};