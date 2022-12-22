import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guard/auth.guard";
import { WorkspaceComponent } from "./workspace.component";

const routes: Routes = [
    { path: '', component: WorkspaceComponent, canActivate: [ AuthGuard ], children: [
        { path: '', loadChildren: () => import('../plano/plano.module').then(m => m.PlanoModule) },
        { path: 'teste2', loadChildren: () => import('../plano/plano.module').then(m => m.PlanoModule) }
    ] }
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    declarations: [ WorkspaceComponent ]
})
export class WorkspaceModule{

}