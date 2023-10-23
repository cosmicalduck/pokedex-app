import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
  loadPokemons,
  loadedPokemons,
} from 'src/app/state/actions/pokemon.actions';
import { Observable } from 'rxjs';
import { selectPokemonLoading } from 'src/app/state/selectors/pokemon.selector';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  displayedColumns: string[] = ['url', 'name'];
  dataSource!: MatTableDataSource<any>;
  @Output() clickPokemonEvent = new EventEmitter<string>();
  pokemonName!: string;

  loading$: Observable<boolean> = new Observable();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _pkmService: PokemonService, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectPokemonLoading);
    this.store.dispatch(loadPokemons());
    this.getPokemonList();
  }

  getPokemonList() {
    this._pkmService.getPokemonList().subscribe({
      next: (res) => {
        this.store.dispatch(loadedPokemons({ pokemonList: res }));
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRowPokemon(row: { name: string; url: string }) {
    this.pokemonName = row.name;
    this.clickPokemonEvent.emit(row.name);
  }
}
