import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CajeroComponent } from './components/cajero/cajero.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { DrinkDetalleComponent } from './components/drink-detalle/drink-detalle.component';
import { DrinksService } from './servicios/drinks.service';
import { CategoriasService } from './servicios/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    CajeroComponent,
    CategoriasComponent,
    DrinksComponent,
    DrinkDetalleComponent,
    InicioComponent,
    NavbarComponent,
    CatalogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [DrinksService, CategoriasService],
  bootstrap: [AppComponent],
  entryComponents: [DrinksComponent],
})
export class AppModule {}
