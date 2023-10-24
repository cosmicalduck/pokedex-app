import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import * as PokemonActions from '../actions/pokemon.actions';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FavoritePokemonService } from 'src/app/services/favorite-pokemon.service';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      mergeMap(() => {
        return this.pokemonService.getPokemonList().pipe(
          map((pokemons) =>
            PokemonActions.loadedPokemons({ pokemonList: pokemons })
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );
  loadFavoritePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadFavoritePokemon),
      mergeMap(() => {
        return this.favoritePokemonService.getFavoritePokemon().pipe(
          map(
            (favoritePokemonName) =>
              PokemonActions.loadedFavoritePokemon({
                favoritePokemon: favoritePokemonName,
              }),
            catchError(() => EMPTY)
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private favoritePokemonService: FavoritePokemonService
  ) {}
}
