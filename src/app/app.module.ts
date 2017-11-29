import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TableService } from './table/table.service';
import { TableComponent } from './table/table.component';
import { CellService } from './cell/cell.service';
import { CellComponent } from './cell/cell.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [ TableService, CellService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
