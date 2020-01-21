import { Component, OnInit /* ChangeDetectionStrategy */ } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

import { Topping } from '../../models/topping.model';
import { ToppingsService } from '../../services/toppings.service';

@Component({
  selector: 'app-product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  pizza: Pizza = {};
  visualize: Pizza = {};
  toppings: Topping[] = [];

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe((pizzas) => {
      const param = this.route.snapshot.params.id;
      let pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = pizzas.find((thePizza) => thePizza.id === parseInt(param, 10));
      }
      this.pizza = pizza ? pizza : {};
      this.toppingsService.getToppings().subscribe((toppings) => {
        this.toppings = toppings;
        this.onSelect(
          toppings.map((topping) => (topping.id ? topping.id : NaN)),
        );
      });
    });
  }

  onSelect(event: number[]) {
    let toppings;
    if (this.toppings && this.toppings.length) {
      toppings = event.map((id) =>
        this.toppings.find((topping) => topping.id === id),
      );
    } else {
      toppings = this.pizza.toppings;
    }
    this.visualize = { ...this.pizza, toppings: toppings as Topping[] };
  }

  onCreate(event: Pizza) {
    this.pizzaService.createPizza(event).subscribe((pizza) => {
      this.router.navigate([`/products/${pizza.id}`]);
    });
  }

  onUpdate(event: Pizza) {
    this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
  }
}