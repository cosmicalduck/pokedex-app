import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritePokemonService {
  url: string = 'http://localhost:3000/favoritePokemon';

  constructor(private _http: HttpClient) {}

  getFavoritePokemon(): Observable<string> {
    return this._http.get<{ favoritePokemonName: string }>(this.url).pipe(
      map((response) => {
        return response.favoritePokemonName;
      })
    );
  }

  postFavoritePokemon(data: { favoritePokemonName: string }) {
    return this._http.post(this.url, data);
  }
}
