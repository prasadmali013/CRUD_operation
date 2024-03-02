import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorycrudComponent } from './categorycrud/categorycrud.component';
import { ProductcrudComponent } from './productcrud/productcrud.component';

const routes: Routes = [
  {
    path: 'category',
    component: CategorycrudComponent
  },
  {
    path: 'products',
    component: ProductcrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
