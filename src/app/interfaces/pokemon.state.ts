import { Result } from './api-response';

export interface PokemonState {
  loading: boolean;
  favoritePokemon: string;
  pokemonList: Result[] | [];
}
