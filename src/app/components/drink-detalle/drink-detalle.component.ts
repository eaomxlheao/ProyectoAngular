import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NgbActiveModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-drink-detalle',
  templateUrl: './drink-detalle.component.html',
  styleUrls: ['./drink-detalle.component.css'],
})
export class DrinkDetalleComponent implements OnInit {
  @Input() public selectedDrink;
  @Output() actualizarCantidadDrinks: EventEmitter<Number> = new EventEmitter();
  drinks: Number = 0;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  passBack() {
    this.actualizarCantidadDrinks.emit(this.drinks);
    this.activeModal.dismiss();
  }
}
