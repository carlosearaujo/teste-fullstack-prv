import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./view/login/login.module').then(m => m.LoginModule) },
  { path: '', loadChildren: () => import('./view/workspace/workspace.module').then(m => m.WorkspaceModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
