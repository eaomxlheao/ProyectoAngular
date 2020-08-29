import { Component, OnInit } from '@angular/core';
import { DrinksService } from 'src/app/servicios/drinks.service';
import { Drink } from '../../modelos/drink';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { DrinkDetalleComponent } from '../drink-detalle/drink-detalle.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];
  selectedDrink: Drink;
  constructor(
    public drinkService: DrinksService,
    public categoriaService: CategoriasService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe((resp: any) => {
      this.drinkService.setDrinks(resp);
    });
  }

  openModal(id: Number) {
    this.selectedDrink = this.drinkService.drinks.filter((d) => d.id == id)[0];
    const modalRef = this.modalService.open(DrinkDetalleComponent);
    modalRef.componentInstance.selectedDrink = this.selectedDrink;
    modalRef.componentInstance.actualizarCantidadDrinks.subscribe(
      (cuantosDrinks: Number) => {
        console.log(cuantosDrinks);
      }
    );
  }
}
