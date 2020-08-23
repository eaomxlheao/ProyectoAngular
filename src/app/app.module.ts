import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { DrinkDetalleComponent } from './components/drink-detalle/drink-detalle.component';
import { DrinksService } from './servicios/drinks.service';
import { CategoriasService } from './servicios/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriasComponent,
    DrinksComponent,
    DrinkDetalleComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [DrinksService, CategoriasService],
  bootstrap: [AppComponent],
  entryComponents: [DrinksComponent],
})
export class AppModule {}
