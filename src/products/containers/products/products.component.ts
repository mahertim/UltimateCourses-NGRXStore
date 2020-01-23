import { Component, OnInit /* ChangeDetectionStrategy */ } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-products',
  styleUrls: ['products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = of([]);

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select<Pizza[]>(fromStore.getAllPizzas);
    this.store.dispatch(new fromStore.LoadToppings());
  }
}
