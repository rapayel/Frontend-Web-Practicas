import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_CLAVE } from '../decoradores/roles.decorator';
import { PayloadJwt, Rol } from '../dominio/usuario';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(contexto: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<Rol[]>(
      ROLES_CLAVE,
      [contexto.getHandler(), contexto.getClass()],
    );
    if (!rolesRequeridos) {
      return true;
    }
    const request = contexto.switchToHttp().getRequest<{ user?: PayloadJwt }>();
    const usuario = request.user;

    if (!usuario) {
      return false;
    }
    const tieneRol = rolesRequeridos.includes(usuario.rol);
    if (!tieneRol) {
      throw new ForbiddenException(
        'No tienes permisos suficientes para realizar esta accion',
      );
    }

    return true;
  }
}