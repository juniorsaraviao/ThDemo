import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from 'src/app/models/resultResponse';

@Injectable({
  providedIn: 'root'
})
export class LoadPokemonService {

  constructor(public httpClient: HttpClient) { }

  loadPokemonList(): Observable<ResultResponse> {
    return this.httpClient.get<ResultResponse>('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
  }
}
