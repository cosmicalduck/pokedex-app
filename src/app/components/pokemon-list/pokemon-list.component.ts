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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _pkmService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonList();
    console.log(this.dataSource);
  }

  getPokemonList() {
    this._pkmService.getPokemonList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.results); //res._data._value.results
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
