import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

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

export const getProductsState = createFeatureSelector<ProductsState>(
  'products',
);

// pizza state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas,
);

export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded,
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading,
);
