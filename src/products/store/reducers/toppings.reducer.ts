import * as fromToppings from '../actions/toppings.action';

import { Topping } from '../../models/topping.model';

import { mapToEntities } from '../../util';

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state: ToppingsState = initialState,
  action: fromToppings.ToppingsAction,
): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = mapToEntities<Topping>(toppings, state.entities);
      return {
        ...state,
        loaded: true,
        loading: false,
        entities,
      };
    }

    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    default: {
      return { ...state };
    }
  }
  return { ...state };
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
