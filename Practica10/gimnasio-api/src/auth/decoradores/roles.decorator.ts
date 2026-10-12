import { SetMetadata } from '@nestjs/common';
import { Rol } from '../dominio/usuario';

export const ROLES_CLAVE = 'roles';
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_CLAVE, roles);