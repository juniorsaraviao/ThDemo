import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonResponse } from 'src/app/models/pokemonResponse';

@Injectable({
  providedIn: 'root'
})
export class LoadDetailPokemonService {

  constructor(public httpClient: HttpClient) { }

  loadDetailPokemon(url: string): Observable<PokemonResponse> {
    return this.httpClient.get<PokemonResponse>(url);
  }
}
