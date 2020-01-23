import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkToppingsLoaded().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  checkToppingsLoaded(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadToppings());
        }
      }),
      filter((loaded) => loaded),
      take(1),
    );
  }
}
