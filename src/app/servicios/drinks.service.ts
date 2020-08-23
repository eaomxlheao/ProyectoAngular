import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drink } from '../modelos/drink';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  constructor(public http: HttpClient) {}
  drinks: Drink[] = [];
  filteredDrinks: Drink[] = [];
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
      drink.strDrink = resp.drinks[i].strDrink;
      drink.idDrink = resp.drinks[i].idDrink;
      drink.strDrinkThumb = resp.drinks[i].strDrinkThumb;
      drink.precio = Math.floor(Math.random() * (150 - 50)) + 50;
      drink.categoria = Math.floor(Math.random() * (5 - 1)) + 1;
      this.drinks.push(drink);
    }
    this.drinks = this.drinks.sort((a, b) =>
      a.strDrink > b.strDrink ? 1 : -1
    );

    this.filtrarDrinks(0);
  }
}
