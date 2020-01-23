import { Component, OnInit /* ChangeDetectionStrategy */ } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza> = of({});
  visualize: Pizza = {};
  toppings$: Observable<Topping[]> = of([]);

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadToppings());
    this.pizza$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getAllToppings);
  }

  onSelect(_event: number[]) {}

  onCreate(_event: Pizza) {}

  onUpdate(_event: Pizza) {}

  onRemove(_event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
