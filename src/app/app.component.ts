import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pokemonName!: string;
  favoritePokemon!: string;
  showDetails: boolean = false;
  constructor() {}

  getPokemonName(pkmName: string) {
    this.pokemonName = pkmName;
    this.showDetails = true;
  }

  getFavoritePokemon(pkmName: string) {
    this.favoritePokemon = pkmName;
  }
}
