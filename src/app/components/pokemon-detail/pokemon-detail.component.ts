import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetail } from 'src/app/interfaces/pokemon-detail';
import { FavoritePokemonService } from 'src/app/services/favorite-pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  @ViewChild('button') button!: ElementRef;
  @Input() name!: string;
  pokemonDetail!: PokemonDetail;
  hasSecondType: boolean = false;
  favoritePkmName!: string;
  @Output() favoritePokemon = new EventEmitter<string>();
  loadCompleted: boolean = false;

  constructor(
    private _pkmService: PokemonService,
    private _favPkmService: FavoritePokemonService
  ) {}

  ngOnInit(): void {
    this.hasSecondType = false;
    this.getPokemonDetails(this.name);
  }

  ngOnChanges(): void {
    this.hasSecondType = false;
    if (this.pokemonDetail !== undefined) {
      if (this.name !== this.pokemonDetail.name) {
        this.getPokemonDetails(this.name);
      }
    }
  }

  getPokemonDetails(name: string) {
    this._pkmService.getPokemon(name).subscribe({
      next: (res) => {
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
      complete: () => {
        this.loadCompleted = true;
      },
    });
  }

  markAsFavoritePokemon(name: string) {
    this.markedAsFavorie();
    this.favoritePokemon.emit(name);
    this._favPkmService
      .postFavoritePokemon({ favoritePokemonName: name })
      .subscribe({
        next: () => alert(`${name} ha sido guardado como tu pokémon favorito.`),
        error: () => alert('No se ha podido completar la acción'),
      });
  }

  markedAsFavorie() {
    (<any>this.button).color = 'primary';
  }
}
