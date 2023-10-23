import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.css'],
})
export class FavoritePokemonComponent implements OnInit {
  @Input() favoritePkmName!: string;

  constructor(
    private _pkmService: PokemonService,
    private dialogRef: MatDialogRef<FavoritePokemonComponent>
  ) {}

  ngOnInit(): void {
    this._pkmService.getPokemon(this.favoritePkmName);
  }
}
