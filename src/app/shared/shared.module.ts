import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlFieldComponent } from './components/control-field/control-field.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  ControlFieldComponent
];

@NgModule({
  declarations: [...COMPONENTS, ShowListComponent, EditPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
