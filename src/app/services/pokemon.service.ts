import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../interfaces/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemonList(): Observable<APIResponse> {
    return this._http.get<APIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );
  }

  getPokemon(name: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
