import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';

import { LoadPizzas } from '../store/actions/pizzas.action';
import { getPizzasLoaded } from '../store/selectors/pizzas.selectors';
import { ProductsState } from '../store/reducers/index';

export function checkPizzasLoaded(
  store: Store<ProductsState>,
): Observable<boolean> {
  return store.select(getPizzasLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(new LoadPizzas());
      }
    }),
    filter((loaded) => loaded),
    take(1),
  );
}
