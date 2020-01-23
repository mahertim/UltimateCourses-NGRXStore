import { Component, OnInit /* ChangeDetectionStrategy */ } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  visualize$: Observable<Pizza> = of({});
  toppings$: Observable<Topping[]> = of([]);

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza) => {
        (pizza as Pizza | null) = pizza ? pizza : null;
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings: number[] = pizzaExists
          ? (pizza.toppings as Topping[]).map((topping) => topping.id as number)
          : [];
        this.store.dispatch(new fromStore.VisualizeToppings(toppings));
      }),
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualize$ = this.store.select(fromStore.getPizzaVisualized);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}
