import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonService } from './services/pokemon.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  pokemons: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.pokemons);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _pkmService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemonList();
    console.log(this.dataSource);
  }

  getPokemonList() {
    let pokemonData;
    for (let i = 1; i <= 1292; i++) {
      this._pkmService.getPokemonList(i).subscribe({
        next: (res) => {
          //this.dataSource = new MatTableDataSource(res.results); //res._data._value.results
          pokemonData = {
            id: i,
            name: res.name,
          };
          this.pokemons.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.pokemons);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },

        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
