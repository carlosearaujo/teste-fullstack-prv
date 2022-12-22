import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor( private router: Router, private usuarioService: UsuarioService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const usuario = this.usuarioService.usuarioLogado;
        if (!usuario) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
        return true;
    }
}