import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
} from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

import { PizzasAction } from '../actions/pizzas.action';
import { ToppingsAction } from '../actions/toppings.action';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export type ProductsAction = PizzasAction | ToppingsAction;

export const reducers: ActionReducerMap<ProductsState, ProductsAction> = {
  pizzas: fromPizzas.reducer as ActionReducer<
    fromPizzas.PizzaState,
    ProductsAction
  >,
  toppings: fromToppings.reducer as ActionReducer<
    fromToppings.ToppingsState,
    ProductsAction
  >,
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products',
);
