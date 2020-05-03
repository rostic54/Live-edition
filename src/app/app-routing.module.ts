import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './shared/components/show-list/show-list.component';
import { EditPageComponent } from './shared/components/edit-page/edit-page.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent, children: [
      {path: '', component: ShowListComponent},
      {path: 'edit', component: EditPageComponent}
    ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
