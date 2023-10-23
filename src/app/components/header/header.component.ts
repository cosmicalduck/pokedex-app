import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoritePokemonComponent } from '../favorite-pokemon/favorite-pokemon.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() favPokemonName!: string;

  constructor(private _dialog: MatDialog) {}

  openFavoritePokemon() {
    this._dialog.open(FavoritePokemonComponent, {
      width: '40%',
      data: {
        favoritePokemonName: this.favPokemonName,
      },
    });
  }
}
