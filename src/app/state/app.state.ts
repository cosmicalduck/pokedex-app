import { ActionReducerMap } from '@ngrx/store';
import { PokemonState } from '../interfaces/pokemon.state';
import { pokemonReducer } from './reducers/pokemon.reducer';

export interface AppState {
  pokemons: PokemonState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer,
};
