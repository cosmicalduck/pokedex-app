import { createAction, props } from '@ngrx/store';
import { Result } from 'src/app/interfaces/api-response';

export const loadPokemons = createAction('[Pokemon List] Load pokemons');

export const loadedPokemons = createAction(
  '[Pokemon List] Loaded successfully',
  props<{ pokemonList: Result[] }>()
);

export const setFavoritePokemon = createAction(
  '[Pokemon Detail] Set successfully',
  props<{ favoritePokemon: string }>()
);
