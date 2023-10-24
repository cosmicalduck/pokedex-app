import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import {
  loadFavoritePokemon,
  loadPokemons,
} from './state/actions/pokemon.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pokemonName!: string;
  favoritePokemon!: string;
  showDetails: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
    this.store.dispatch(loadFavoritePokemon());
  }

  getPokemonName(pkmName: string) {
    this.pokemonName = pkmName;
    this.showDetails = true;
  }
}
