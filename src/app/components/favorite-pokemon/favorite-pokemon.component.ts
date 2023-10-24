import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavoritePokemon } from 'src/app/state/selectors/pokemon.selector';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.css'],
})
export class FavoritePokemonComponent implements OnInit {
  favoritePkmName$: Observable<string> = new Observable();
  stringFavPkmName!: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.favoritePkmName$ = this.store.select(selectFavoritePokemon);
    this.favoritePkmName$.subscribe((pokemonName) => {
      this.stringFavPkmName = pokemonName;
    });
  }
}
