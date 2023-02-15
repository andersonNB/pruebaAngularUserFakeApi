import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewUserComponent } from './components/new-user/new-user.component';
import { InitPageComponent } from './components/init-page/init-page.component';

const routes: Routes = [
  {
    path: '',
    component: InitPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: NewUserComponent,
  },
  {
    path: '**',
    component: InitPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
