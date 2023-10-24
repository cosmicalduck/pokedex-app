import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPokemonList } from '../state/selectors/pokemon.selector';
import { AppState } from '../state/app.state';
import { Result } from '../interfaces/api-response';

@Component({
  selector: 'app-pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.css'],
})
export class PokemonSummaryComponent implements OnInit, OnDestroy {
  letters: string[] = [...'abcdefghijklmnopqrstuvwxyz'];
  pokemonList$: Observable<Result[]> = new Observable();
  pokemonSubscription!: Subscription;
  pokemonArray!: Result[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.pokemonList$ = this.store.select(selectPokemonList);
    this.pokemonSubscription = this.pokemonList$.subscribe((pokemons) => {
      this.pokemonArray = pokemons;
    });
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe();
  }

  getPokemonsByLetter(letter: string) {
    return this.pokemonArray.filter((pokemon) =>
      pokemon.name.startsWith(letter)
    );
  }
}
