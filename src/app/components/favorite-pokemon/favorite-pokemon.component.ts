import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.css'],
})
export class FavoritePokemonComponent implements OnInit {
  favoritePokemonName!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public pkmData: DialogData) {}

  ngOnInit(): void {
    this.favoritePokemonName = this.pkmData.favoritePokemonName;
  }
}
