import { Component, OnInit } from '@angular/core';
import { Drink } from 'src/app/modelos/drink';
import { DrinksService } from 'src/app/servicios/drinks.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DrinkDetalleComponent } from '../drink-detalle/drink-detalle.component';
import { FBDrink } from 'src/app/interfaces/fbDrink';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  drinks: Drink[] = [];
  constructor(
    public drinksService: DrinksService,
    public categoriaService: CategoriasService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getDrinks();
  }

  getDrinks() {
    this.drinks = [];
    this.drinksService.getFBDrinks().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          let drink: Drink = new Drink();
          drink.id = Number(data[i].id);
          drink.nombre = data[i].nombre;
          drink.imagen = data[i].imagen;
          drink.categoria = Number(data[i].categoria);
          drink.precio = Number(data[i].precio);
          this.drinks.push(drink);
        }
        console.log('Drinks: ', this.drinks);
      },
      (err) => console.log(err)
    );
  }

  openModal(id: Number) {
    let selectedDrink: Drink = this.drinks.filter((d) => d.id == id)[0];
    const modalRef = this.modalService.open(DrinkDetalleComponent);
    modalRef.componentInstance.selectedDrink = selectedDrink;
    modalRef.componentInstance.actualizarCantidadDrinks.subscribe(
      (cuantosDrinks: Number) => {
        console.log(cuantosDrinks);
      }
    );
  }

  deleteDrink(drink: Drink) {
    let toDelete: any = {
      nombre: drink.nombre,
      imagen: drink.imagen,
      categoria: drink.categoria,
      precio: drink.precio,
      id: drink.id,
    };
    this.drinksService.deleteDrink(toDelete);
    this.getDrinks();
  }

  editDrink(drink: Drink) {
    let toEdit: any = {
      nombre: drink.nombre,
      imagen: drink.imagen,
      categoria: drink.categoria,
      precio: drink.precio + 10,
      id: drink.id,
    };
    this.drinksService.getDrink(toEdit);
    //this.drinksService.editDrink(toEdit);
    //this.getDrinks();
  }
}
