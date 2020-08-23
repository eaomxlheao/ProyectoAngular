import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelos/categoria';
import { CategoriasService } from '../../servicios/categorias.service';
import { DrinksService } from 'src/app/servicios/drinks.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  constructor(
    public categoriasService: CategoriasService,
    public drinkService: DrinksService
  ) {
    this.categorias = this.categoriasService.categorias;
  }

  ngOnInit(): void {}

  setCategoria(categoria: Number) {
    this.categoriasService.seleccion = categoria;
    this.drinkService.filtrarDrinks(categoria);
  }
}
