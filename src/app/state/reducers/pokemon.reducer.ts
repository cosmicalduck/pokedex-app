import { createReducer, on } from '@ngrx/store';
import {
  loadFavoritePokemon,
  loadPokemons,
  loadedFavoritePokemon,
  loadedPokemons,
  setFavoritePokemon,
} from '../actions/pokemon.actions';
// import { increment, decrement, reset } from './counter.actions';
import { PokemonState } from 'src/app/interfaces/pokemon.state';

export const initialState: PokemonState = {
  loading: false,
  favoritePokemon: '',
  pokemonList: [],
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedPokemons, (state, action) => {
    return { ...state, loading: false, pokemonList: action.pokemonList };
  }),
  on(loadFavoritePokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedFavoritePokemon, (state, action) => {
    return {
      ...state,
      loading: false,
      favoritePokemon: action.favoritePokemon,
    };
  }),
  on(setFavoritePokemon, (state, action) => {
    return {
      ...state,
      loading: false,
      favoritePokemon: action.favoritePokemon,
    };
  })
);
