import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PokemonState } from 'src/app/interfaces/pokemon.state';

export const selectPokemonsFeature = (state: AppState) => state.pokemons;

export const selectPokemonList = createSelector(
  selectPokemonsFeature,
  (state: PokemonState) => state.pokemonList
);

export const selectFavoritePokemon = createSelector(
  selectPokemonsFeature,
  (state: PokemonState) => state.favoritePokemon
);

export const selectPokemonLoading = createSelector(
  selectPokemonsFeature,
  (state: PokemonState) => state.loading
);
