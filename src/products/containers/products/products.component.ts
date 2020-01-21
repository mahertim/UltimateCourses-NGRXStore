import { Component, OnInit /* ChangeDetectionStrategy */ } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

@Component({
  selector: 'app-products',
  styleUrls: ['products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[] = [];

  constructor(private pizzaService: PizzasService) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe((pizzas) => {
      this.pizzas = pizzas;
    });
  }
}
