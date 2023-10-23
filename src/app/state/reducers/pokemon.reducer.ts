import { createReducer, on } from '@ngrx/store';
import { loadPokemons, loadedPokemons } from '../actions/pokemon.actions';
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
  on(loadedPokemons, (state, { pokemonList }) => {
    return { ...state, loading: false, pokemonList };
  })
);
