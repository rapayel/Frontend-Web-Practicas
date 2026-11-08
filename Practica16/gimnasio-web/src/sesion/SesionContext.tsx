
import { createContext, useContext, useState, type ReactNode } from 'react';
import * as servicio from '../servicios/sesion.ts';
import type { Sesion, Usuario } from '../tipos.ts';


interface ValorSesion {
  token: string | null;
  usuario: Usuario | null;
  entrar: (correo: string, password: string) => Promise<void>;
  registrar: (nombre: string, correo: string, password: string) => Promise<void>;
  salir: () => void;
}

const SesionContext = createContext<ValorSesion | null>(null);

function leerSesion(): Sesion | null {
  const token = localStorage.getItem('token');
  const guardado = localStorage.getItem('usuario');
  if (!token || !guardado) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    return null;
  }

  try {
    const usuario: unknown = JSON.parse(guardado);
    if (
      typeof usuario === 'object' &&
      usuario !== null &&
      'correo' in usuario &&
      typeof usuario.correo === 'string' &&
      'nombre' in usuario &&
      typeof usuario.nombre === 'string' &&
      'rol' in usuario &&
      (usuario.rol === 'miembro' ||
        usuario.rol === 'entrenador' ||
        usuario.rol === 'admin')
    ) {
      return {
        token,
        usuario: {
          correo: usuario.correo,
          nombre: usuario.nombre,
          rol: usuario.rol,
        },
      };
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  return null;
}

export function ProveedorSesion({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState<Sesion | null>(leerSesion);

  function guardar(sesion: Sesion) {
    localStorage.setItem('token', sesion.token);
    localStorage.setItem('usuario', JSON.stringify(sesion.usuario));
    setSesion(sesion);
  }

  async function entrar(correo: string, password: string) {
    guardar(await servicio.entrar(correo, password));
  }

  async function registrar(nombre: string, correo: string, password: string) {
    guardar(await servicio.registrar(nombre, correo, password));
  }

  function salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setSesion(null);
  }

  return (
    <SesionContext
      value={{
        token: sesion?.token ?? null,
        usuario: sesion?.usuario ?? null,
        entrar,
        registrar,
        salir,
      }}
    >
      {children}
    </SesionContext>
  );
}

export function useSesion() {
  const valor = useContext(SesionContext);
  if (!valor) throw new Error('useSesion() tiene que usarse dentro de <ProveedorSesion>');
  return valor;
}