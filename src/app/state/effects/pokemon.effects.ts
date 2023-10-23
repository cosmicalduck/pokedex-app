import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Pokemon List] Load pokemons'),
      exhaustMap(() =>
        this.pokemonService.getPokemonList().pipe(
          map((pokemonList) => ({
            type: '[Pokemon List] Loaded successfully',
            payload: pokemonList,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}
