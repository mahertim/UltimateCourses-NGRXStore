import * as fromPizzas from '../actions/pizzas.action';

import { Pizza } from '../../models/pizza.model';

import { mapToEntities } from '../../util/map-to-entities.helper';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state: PizzaState = initialState,
  action: fromPizzas.PizzasAction,
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      const entities = mapToEntities(pizzas, state.entities);
      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromPizzas.CREATE_PIZZA_SUCCESS:
    case fromPizzas.UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id as number]: pizza,
      };
      return {
        ...state,
        entities,
      };
    }

    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const { [pizza.id as number]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities,
      };
    }

    default: {
      return { ...state };
    }
  }
  return { ...state };
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
