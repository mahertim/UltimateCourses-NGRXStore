import { ActionReducerMap } from '@ngrx/store';

import * as fromPizzas from './pizza.reducer';
import { PizzasAction } from '../actions/pizzas.action';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

// add other action types as we create them
export type ProductsAction = PizzasAction;

export const reducers: ActionReducerMap<ProductsState, ProductsAction> = {
  pizzas: fromPizzas.reducer,
};
