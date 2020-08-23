import { Injectable } from '@angular/core';
import { Categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  categorias: Categoria[] = [];
  seleccion: Number;

  constructor() {
    this.seleccion = 0;
    let cat: Categoria = new Categoria();
    cat.id = 1;
    cat.descripcion = 'Tequila';
    this.categorias.push(cat);
    cat = new Categoria();
    cat.id = 2;
    cat.descripcion = 'Ron';
    this.categorias.push(cat);
    cat = new Categoria();
    cat.id = 3;
    cat.descripcion = 'Wiskey';
    this.categorias.push(cat);
    cat = new Categoria();
    cat.id = 4;
    cat.descripcion = 'Vodka';
    this.categorias.push(cat);
  }
}
