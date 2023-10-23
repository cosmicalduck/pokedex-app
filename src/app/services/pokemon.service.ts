import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Result } from '../interfaces/api-response';
import { PokemonDetail } from '../interfaces/pokemon-detail';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemonList(): Observable<Result[]> {
    return this._http
      .get<APIResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      )
      .pipe(
        map((response) => {
          return response.results;
        })
      );
  }

  getPokemon(name: string): Observable<PokemonDetail> {
    return this._http.get<PokemonDetail>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }
}
