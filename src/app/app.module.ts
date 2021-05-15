import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';

import { CountryMainComponent } from './components/country-main/country-main.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { ActivityMainComponent } from './components/activity-main/activity-main.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { AbstractDataMainComponent } from './components/abstract/abstract-data-main/abstract-data-main.component';
import { EventMainComponent } from './components/event-main/event-main.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppConfig } from './config/config';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { Helpers } from './helpers/helpers';
import { AuthGuard } from './helpers/canActivateAuthGuard';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CountryMainComponent,
    ProductMainComponent,
    ActivityMainComponent,
    DashboardMainComponent,
    AbstractDataMainComponent,
    EventMainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    PanelMenuModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ContextMenuModule,
    SelectButtonModule,
    ToastModule
  ],
  providers: [HttpClient, AppConfig, DatePipe, Helpers, AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
