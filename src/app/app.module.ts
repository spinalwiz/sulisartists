import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {DataService} from "./data.service";
import {SelectModule} from "ng2-select/ng2-select";
import { MyselectComponent } from './myselect/myselect.component';
import {Angular2DataTableModule} from "angular2-data-table";

@NgModule({
  declarations: [
    AppComponent,
    MyselectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JsonpModule,
    SelectModule,
    Angular2DataTableModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
