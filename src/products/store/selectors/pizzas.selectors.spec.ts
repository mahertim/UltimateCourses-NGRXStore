import { TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';

import {
  StoreModule,
  Store,
  combineReducers,
  ActionReducer,
} from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/';
import * as fromPizza from '../reducers/pizzas.reducer';

import { Pizza } from '../../models/pizza.model';

describe('Pizzas Selectors', () => {
  let store: Store<fromReducers.ProductsState>;
  const pizza1: Pizza = {
    id: 1,
    name: "Fish 'n Chips",
    toppings: [
      { id: 1, name: 'fish' },
      { id: 2, name: 'chips' },
      { id: 3, name: 'cheese' },
    ],
  };
  const pizza2: Pizza = {
    id: 2,
    name: 'Aloha',
    toppings: [
      { id: 1, name: 'ham' },
      { id: 2, name: 'pineapple' },
      { id: 3, name: 'cheese' },
    ],
  };
  const pizza3: Pizza = {
    id: 3,
    name: 'Burrito',
    toppings: [
      { id: 1, name: 'beans' },
      { id: 2, name: 'beef' },
      { id: 3, name: 'rice' },
      { id: 4, name: 'cheese' },
      { id: 5, name: 'avocado' },
    ],
  };
  const pizzas: Pizza[] = [pizza1, pizza2, pizza3];
  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            ...fromRoot.reducers,
            products: combineReducers(fromReducers.reducers) as ActionReducer<
              fromReducers.ProductsState
            >,
          },
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
              strictStateSerializability: true,
            },
          },
        ),
      ],
    });
    store = TestBed.get(Store);
  });

  describe('getPizzaState', () => {
    it('should return state of pizza store slice', () => {
      let result: fromPizza.PizzaState = fromPizza.initialState;
      expect(result).toEqual(fromPizza.initialState);
      result = { entities: {}, loaded: true, loading: true };
      store
        .select(fromSelectors.getPizzaState)
        .subscribe((value) => (result = value));
      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });
      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('getPizzaEntities', () => {
    it('should return pizzas as entities', () => {
      let result: { [id: number]: Pizza } = {};
      store
        .select(fromSelectors.getPizzasEntities)
        .subscribe((value) => (result = value));
      expect(result).toEqual({});
      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));
      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedPizza', () => {
    it('should return selected pizza as an entity', () => {
      let result: Pizza = {};
      let params: Params = { pizzaId: '2' };
      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));
      store.dispatch({
        type: ROUTER_NAVIGATION,
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params,
          },
          event: {},
        },
      });
      params = {};
      store
        .select(fromRoot.getRouterState)
        .subscribe((routerState) => (params = routerState.state.params));
      expect(params).toEqual({ pizzaId: '2' });
      store
        .select(fromSelectors.getSelectedPizza)
        .subscribe((selectedPizza) => (result = selectedPizza));
      expect(result).toEqual(entities[2]);
    });
  });

  describe('getPizzaVisualized', () => {
    it('should return selected pizza composed with selected toppings', () => {
      let result = {};
      const toppings = [
        {
          id: 6,
          name: 'mushroom',
        },
        {
          id: 9,
          name: 'pepper',
        },
        {
          id: 11,
          name: 'sweetcorn',
        },
      ];
      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));
      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));
      store.dispatch(new fromActions.VisualizeToppings([11, 9, 6]));
      store.dispatch({
        type: ROUTER_NAVIGATION,
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params: { pizzaId: '2' },
          },
          event: {},
        },
      });
      store
        .select(fromSelectors.getPizzaVisualized)
        .subscribe((selectedPizza) => (result = selectedPizza));
      const expectedToppings = [toppings[2], toppings[1], toppings[0]];
      expect(result).toEqual({ ...entities[2], toppings: expectedToppings });
    });
  });

  describe('getAllPizzas', () => {
    it('should return pizzas as an array', () => {
      let result: Pizza[] = [{}];
      store
        .select(fromSelectors.getAllPizzas)
        .subscribe((value) => (result = value));
      expect(result).toEqual([]);
      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));
      expect(result).toEqual(pizzas);
    });
  });

  describe('getPizzasLoaded', () => {
    it('should return the pizzas loaded state', () => {
      let result = true;
      store
        .select(fromSelectors.getPizzasLoaded)
        .subscribe((value) => (result = value));
      expect(result).toEqual(false);
      store.dispatch(new fromActions.LoadPizzasSuccess([]));
      expect(result).toEqual(true);
    });
  });

  describe('getPizzasLoading', () => {
    it('should return the pizzas loading state', () => {
      let result = true;
      store
        .select(fromSelectors.getPizzasLoading)
        .subscribe((value) => (result = value));
      expect(result).toEqual(false);
      store.dispatch(new fromActions.LoadPizzas());
      expect(result).toEqual(true);
    });
  });
});
