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
import { Observable, map } from 'rxjs';
import {
  selectPokemonList,
  selectPokemonLoading,
} from 'src/app/state/selectors/pokemon.selector';
import { Result } from 'src/app/interfaces/api-response';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  displayedColumns: string[] = ['url', 'name'];
  dataSource!: MatTableDataSource<Result>;
  @Output() clickPokemonEvent = new EventEmitter<string>();
  pokemonName!: string;

  pokemonList$: Observable<Result[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _pkmService: PokemonService, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectPokemonLoading);
    this.pokemonList$ = this.store.select(selectPokemonList);
    this.pokemonList$.subscribe((pokemonList) => {
      this.dataSource = new MatTableDataSource(pokemonList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
