import './boton-app';
import './tarjeta-producto';
import type { Producto, DetalleAgregar } from './tipos';

const rejilla = document.querySelector<HTMLElement>('#rejilla')!;
const cuenta = document.querySelector<HTMLElement>('#cuenta')!;
const vaciar = document.querySelector<HTMLElement>('#vaciar')!;
let enCarrito = 0;

const productos: Producto[] = [
  { id: 'p01', nombre: 'Tenis para correr Vento', precio: 1299, imagen: '/img/producto-01.jpg', existencia: 8 },
  { id: 'p02', nombre: 'Camiseta de entrenamiento Dry', precio: 449, imagen: '/img/producto-02.jpg', existencia: 15 },
  { id: 'p03', nombre: 'Short deportivo Flex', precio: 399, imagen: '/img/producto-03.jpg', existencia: 5 },
  { id: 'p04', nombre: 'Mochila deportiva Pro 30L', precio: 899, imagen: '/img/producto-04.jpg', existencia: 3 },
  { id: 'p05', nombre: 'Botella térmica 1 Litro', precio: 299, imagen: '/img/producto-05.jpg', existencia: 20 },
  { id: 'p06', nombre: 'Sudadera con gorro Active', precio: 799, imagen: '/img/producto-06.jpg', existencia: 10 },
  { id: 'p07', nombre: 'Licra de compresión', precio: 499, imagen: '/img/producto-07.jpg', existencia: 0 },
  { id: 'p08', nombre: 'Chamarra rompevientos', precio: 1199, imagen: '/img/producto-08.jpg', existencia: 0 },
  { id: 'p09', nombre: 'Gorra deportiva Lite', precio: 249, imagen: '/img/producto-09.jpg', existencia: 12 },
  { id: 'p10', nombre: 'Calcetas deportivas (3 pares)', precio: 199, imagen: '/img/producto-10.jpg', existencia: 18 },
  { id: 'p11', nombre: 'Tapete de yoga antiderrapante', precio: 549, imagen: '/img/producto-11.jpg', existencia: 7 },
  { id: 'p12', nombre: 'Banda elástica de resistencia', precio: 149, imagen: '/img/producto-12.jpg', existencia: 25 },
];

for (const p of productos) {
  const tarjeta = document.createElement('tarjeta-producto');
  tarjeta.setAttribute('producto-id', p.id);
  tarjeta.setAttribute('nombre', p.nombre);
  tarjeta.setAttribute('precio', String(p.precio));
  tarjeta.setAttribute('imagen', p.imagen);
  tarjeta.setAttribute('existencia', String(p.existencia));
  rejilla.append(tarjeta);
}

rejilla.addEventListener('agregar', (e: Event) => {
  const detalle = (e as CustomEvent<DetalleAgregar>).detail;
  enCarrito++;
  cuenta.textContent = String(enCarrito);
  console.log('Agregado:', detalle.nombre, detalle.precio);
});

vaciar.addEventListener('click', () => {
  enCarrito = 0;
  cuenta.textContent = '0';
});