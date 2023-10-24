import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetail } from 'src/app/interfaces/pokemon-detail';
import { FavoritePokemonService } from 'src/app/services/favorite-pokemon.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectFavoritePokemon } from 'src/app/state/selectors/pokemon.selector';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('button') button!: ElementRef;
  @Input() name!: string;
  pokemonDetail!: PokemonDetail;
  favPkmName$: Observable<string> = new Observable();
  favPkmNameString!: string;
  favPkmSubscription!: Subscription;
  hasSecondType: boolean = false;
  loadCompleted: boolean = false;

  constructor(
    private _pkmService: PokemonService,
    private _favPkmService: FavoritePokemonService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.hasSecondType = false;
    this.getPokemonDetails(this.name);
    if (
      this.favPkmNameString === null ||
      this.favPkmNameString === '' ||
      this.favPkmNameString === undefined
    ) {
      this.favPkmName$ = this.store.select(selectFavoritePokemon);
      this.favPkmSubscription = this.favPkmName$.subscribe((name) => {
        this.favPkmNameString = name;
      });
    }
  }

  ngOnDestroy(): void {
    this.favPkmSubscription.unsubscribe();
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
          this.pokemonDetail.types[1] !== null ||
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
    this._favPkmService
      .postFavoritePokemon({ favoritePokemonName: name })
      .subscribe({
        next: () => alert(`${name} ha sido guardado como tu pokémon favorito.`),
        error: () => alert('No se ha podido completar la acción'),
      });
  }

  markedAsFavorie() {
    (<any>this.button).class = 'isFavorite';
    (<any>this.button).color = 'accent';
  }
}
