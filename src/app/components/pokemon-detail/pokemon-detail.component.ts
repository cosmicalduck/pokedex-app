import { Component, OnInit, Inject } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail = {};

  constructor(
    private _pkmService: PokemonService,
    @Inject() public name: string
  ) {}

  ngOnInit(): void {
    this.getPokemonDetails(this.name);
  }

  getPokemonDetails(name: string) {
    this._pkmService.getPokemon(name).subscribe({
      next: (res) => {
        console.log(res);
        this.pokemonDetail = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
