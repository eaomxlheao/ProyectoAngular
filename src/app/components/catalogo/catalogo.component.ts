import { Component, OnInit } from '@angular/core';
import { Drink } from 'src/app/modelos/drink';
import { DrinksService } from 'src/app/servicios/drinks.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  drinks: Drink[] = [];
  newDrink: Drink;
  addDrinkForm: FormGroup;
  updateDrinkForm: FormGroup;
  submittedDrink: boolean = false;
  submittedUpdateDrink: boolean = false;
  action: string;
  selectedDrink: Drink;

  constructor(
    public drinksService: DrinksService,
    public categoriaService: CategoriasService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newDrink = new Drink();
    this.addDrinkForm = this.formBuilder.group({
      categoria: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      imagen: new FormControl(''),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*$/),
      ]),
    });

    this.updateDrinkForm = this.formBuilder.group({
      categoria: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      imagen: new FormControl(''),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*$/),
      ]),
    });

    this.getDrinks();
  }

  get fAddDrink() {
    return this.addDrinkForm.controls;
  }

  get fUpdateDrink() {
    return this.updateDrinkForm.controls;
  }

  getDrinks() {
    this.drinks = [];
    this.drinksService.getFBDrinks().subscribe(
      (data: Drink[]) => {
        this.drinks = data;
      },
      (err) => console.log(err)
    );
  }

  addDrink() {
    this.submittedDrink = true;
    if (this.addDrinkForm.invalid) {
      return;
    }
    this.newDrink = new Drink();
    this.newDrink.nombre = this.addDrinkForm.controls['nombre'].value;
    this.newDrink.imagen = this.addDrinkForm.controls['imagen'].value;
    this.newDrink.categoria = Number(
      this.addDrinkForm.controls['categoria'].value
    );
    this.newDrink.precio = Number(this.addDrinkForm.controls['precio'].value);
    this.drinksService
      .addDrink(this.newDrink)
      .then(() => {
        this.getDrinks();
        Swal.fire('Drink agregado', 'Información actualizada', 'success');
        this.modalService.dismissAll();
      })
      .catch((reason: any) => {
        console.log('Error al agregar drink: ' + reason);
      });
  }

  deleteDrink(id: string) {
    this.drinksService
      .deleteDrink(id)
      .then((data: any) => {
        Swal.fire('Drink eliminado', 'Información actualizada', 'success');
        this.getDrinks();
        this.modalService.dismissAll();
      })
      .catch((reason: any) => {
        console.log('Error: ' + reason);
      });
  }

  editDrink() {
    this.submittedDrink = true;
    if (this.updateDrinkForm.invalid) {
      return;
    }
    this.newDrink = new Drink();
    this.newDrink.nombre = this.updateDrinkForm.controls['nombre'].value;
    this.newDrink.imagen = this.updateDrinkForm.controls['imagen'].value;
    this.newDrink.categoria = Number(
      this.updateDrinkForm.controls['categoria'].value
    );
    this.newDrink.precio = Number(
      this.updateDrinkForm.controls['precio'].value
    );
    this.newDrink.id = this.selectedDrink.id;
    this.selectedDrink = new Drink();

    this.drinksService
      .editDrink(this.newDrink)
      .then(() => {
        this.getDrinks();
        Swal.fire('Drink actualizado', 'Información actualizada', 'success');
        this.modalService.dismissAll();
      })
      .catch((reason: any) => {
        console.log('Error al agregar drink: ' + reason);
      });
  }

  open(content) {
    this.submittedDrink = false;
    this.addDrinkForm.reset();

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log('************************');
        },
        (reason) => {
          console.log('------------------------');
        }
      );
  }

  openEdicion(edicion, drink: Drink) {
    this.submittedUpdateDrink = false;
    this.addDrinkForm.reset();
    this.selectedDrink = drink;
    this.updateDrinkForm.controls['nombre'].setValue(this.selectedDrink.nombre);
    this.updateDrinkForm.controls['categoria'].setValue(
      this.selectedDrink.categoria
    );
    this.updateDrinkForm.controls['imagen'].setValue(this.selectedDrink.imagen);
    this.updateDrinkForm.controls['precio'].setValue(this.selectedDrink.precio);
    this.modalService
      .open(edicion, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log('************************');
        },
        (reason) => {
          console.log('------------------------');
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      //return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      //return 'by clicking on a backdrop';
    } else {
      //return `with: ${reason}`;
      console.log('Razon: ' + reason);
    }
    return '';
  }
}
