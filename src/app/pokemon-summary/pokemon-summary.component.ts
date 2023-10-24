import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPokemonList } from '../state/selectors/pokemon.selector';
import { AppState } from '../state/app.state';
import { Result } from '../interfaces/api-response';

@Component({
  selector: 'app-pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.css'],
})
export class PokemonSummaryComponent implements OnInit {
  letters: string[] = [...'abcdefghijklmnopqrstuvwxyz'];
  pokemonList$: Observable<Result[]> = new Observable();
  pokemonArray!: Result[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.pokemonList$ = this.store.select(selectPokemonList);
    this.pokemonList$.subscribe((pokemons) => {
      this.pokemonArray = pokemons;
    });
  }

  getPokemonsByLetter(letter: string) {
    return this.pokemonArray.filter((pokemon) =>
      pokemon.name.startsWith(letter)
    );
    // return this.pokemonList$.pipe(map(pokemon => {pokemon.filter(pokemon.name.)}))

    //   filter((pokemon) =>
    //   pokemon.name.startsWith(letter)
    // ));
    //el count es el length
  }
}
