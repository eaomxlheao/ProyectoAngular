import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drink } from '../modelos/drink';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FBDrink } from '../interfaces/fbDrink';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  drinks: Drink[] = [];
  filteredDrinks: Drink[] = [];
  drinksCollection: AngularFirestoreCollection<Drink>;
  fireDrinks: Observable<Drink[]>;
  snapDrinks: Observable<Drink[]>;
  private drinkDoc: AngularFirestoreDocument<Drink>;

  constructor(public http: HttpClient, public db: AngularFirestore) {
    this.drinksCollection = db.collection<Drink>('drinks');
    this.fireDrinks = this.drinksCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Drink;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getDrinks() {
    return this.http.get(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
    );
  }

  filtrarDrinks(categoria: Number) {
    this.filteredDrinks.length = 0;
    for (let index = 0; index < this.drinks.length; index++) {
      if (categoria == 0) {
        this.filteredDrinks.push(this.drinks[index]);
      } else if (this.drinks[index].categoria == categoria) {
        this.filteredDrinks.push(this.drinks[index]);
      }
    }
  }

  setDrinks(resp: any) {
    let drink: Drink;
    for (let i = 0; i < resp.drinks.length; i++) {
      drink = new Drink();
      drink.nombre = resp.drinks[i].strDrink;
      drink.id = resp.drinks[i].idDrink;
      drink.imagen = resp.drinks[i].strDrinkThumb;
      drink.precio = Math.floor(Math.random() * (150 - 50)) + 50;
      drink.categoria = Math.floor(Math.random() * (5 - 1)) + 1;
      this.drinks.push(drink);
    }
    this.drinks = this.drinks.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));

    this.filtrarDrinks(0);
  }

  getFBDrinks() {
    return this.fireDrinks;
  }

  addDrink(drink: Drink): Promise<any> {
    return this.drinksCollection.add({ ...drink });
  }

  deleteDrink(id: string): Promise<any> {
    this.drinkDoc = this.db.doc<Drink>(`drinks/${id}`);
    return this.drinkDoc.delete();
  }

  editDrink(drink: Drink): Promise<any> {
    this.drinkDoc = this.db.doc<Drink>(`drinks/${drink.id}`);
    let drinkAEditar: any = {
      nombre: drink.nombre,
      imagen: drink.imagen,
      precio: drink.precio,
      categoria: drink.categoria,
    };
    return this.drinkDoc.update(drinkAEditar);
  }
}
