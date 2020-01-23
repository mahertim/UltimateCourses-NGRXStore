import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

import * as fromUtil from '../util';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return fromUtil.checkPizzasLoaded(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }
}
