export class Usuario{
    token: string | undefined;
    constructor(params: Usuario){
        Object.assign(this, params);
    }
}