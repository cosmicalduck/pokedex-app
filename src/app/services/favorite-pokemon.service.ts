import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritePokemonService {
  url: string = 'http://localhost:3000/favoritePokemon';

  constructor(private _http: HttpClient) {}

  getFavoritePokemon() {
    return this._http.get(this.url);
  }

  postFavoritePokemon(data: any) {
    return this._http.post(this.url, data);
  }
}
