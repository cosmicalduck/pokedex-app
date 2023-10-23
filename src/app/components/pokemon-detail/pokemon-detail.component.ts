import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetail } from 'src/app/interfaces/pokemon-detail';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  @Input() name!: string;
  pokemonDetail!: PokemonDetail;
  hasSecondType: boolean = false;
  favoritePkmName!: string;
  @Output() favoritePokemon = new EventEmitter<string>();

  constructor(private _pkmService: PokemonService) {}

  ngOnInit(): void {
    this.hasSecondType = false;
    this.getPokemonDetails(this.name);
  }

  ngOnChanges(): void {
    this.hasSecondType = false;

    this.getPokemonDetails(this.name);
  }

  getPokemonDetails(name: string) {
    this._pkmService.getPokemon(name).subscribe({
      next: (res) => {
        console.log(res);
        this.pokemonDetail = res;
        if (
          this.pokemonDetail.types[1] !== null &&
          this.pokemonDetail.types[1] !== undefined
        ) {
          this.hasSecondType = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  markAsFavoritePokemon(name: string) {
    this.favoritePokemon.emit(name);
    alert(`${name} ha sido guardado como tu pokémon favorito.`);
  }
}
