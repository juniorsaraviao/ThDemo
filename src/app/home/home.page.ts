import { Component } from '@angular/core';
import { LoadPokemonService } from '../services/load/load-pokemon.service';
import { catchError, of, switchMap } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { AlertService } from '../services/alert/alert.service';
import { Result, ResultResponse } from '../models/resultResponse';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemonList: Result[] = [];

  constructor(private loadPokemonService: LoadPokemonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private navController: NavController
  ) {}

  async loadPokemons() {
    await this.loadingService.showLoading();

    this.loadPokemonService.loadPokemonList().pipe(
      switchMap(async (response: ResultResponse) => {
        debugger;
        this.pokemonList = response.results;
        await this.loadingService.hideLoading();
        return of(true);
      }),
      catchError(async(error: Error) => {
        console.log('error: ', error);
        await this.alertMessage(error.message);
      })
    ).subscribe();
  }

  async navigateDetail(pokemonResult: Result) {
    let navigationExtras: NavigationExtras = {
      state: {
        pokemonResult
      }
    }
    await this.navController.navigateForward('/pokemon-detail', navigationExtras);
  }

  async alertMessage(message: string, header: string = 'Error'){
    await this.loadingService.hideLoading();
    const alert = await this.alertService.presentAlert({
      header,
      message: message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
