import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsuarioService{

    constructor(private http: HttpClient){}
    
    login(value: { login: string, password: string }) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(`${value.login}:${value.password}`),
            }),
            responseType: 'text' as const
        };
        return this.http.post(`${environment.apiUrl}/token`,null, httpOptions).pipe(map(token => {
            this.usuarioLogado = new Usuario({ token: <string>token });
            return true;
        }))
    }

    KEY_USUARIO_LOGADO = 'usuario';

    private _usuarioLogado: Usuario | undefined;

    get usuarioLogado(){
        if(!this._usuarioLogado){
            const usuarioJSONStr = localStorage.getItem(this.KEY_USUARIO_LOGADO);
            if(usuarioJSONStr){
                this._usuarioLogado = <Usuario>JSON.parse(usuarioJSONStr);
            }
            
        }
        return this._usuarioLogado;
    }

    private set usuarioLogado(usuario){
        localStorage.setItem(this.KEY_USUARIO_LOGADO, JSON.stringify(usuario));
    }

}