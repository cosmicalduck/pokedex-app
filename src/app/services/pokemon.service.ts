import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemonList(index: number): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
  }
}