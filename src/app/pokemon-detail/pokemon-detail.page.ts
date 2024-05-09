import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from '../models/resultResponse';
import { LoadDetailPokemonService } from '../services/load/load-detail-pokemon.service';
import { catchError, of, switchMap } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { AlertService } from '../services/alert/alert.service';
import { PokemonResponse } from '../models/pokemonResponse';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage {

  pokemonResult!:Result;
  pokemonResponse!: PokemonResponse;
  showCard: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private loadDetailPokemonService: LoadDetailPokemonService,
    private loadingService: LoadingService,
    private alertService: AlertService) {
      this.route.queryParams.subscribe(params => {
        if (this?.router?.getCurrentNavigation()?.extras.state) {
          this.pokemonResult = this?.router?.getCurrentNavigation()?.extras?.state?.['pokemonResult'];
          console.log('url', JSON.stringify(this.pokemonResult));
        }
      });
  }

  async ionViewDidEnter() {
    await this.loadingService.showLoading();
    this.loadDetailPokemonService.loadDetailPokemon(this.pokemonResult.url).pipe(
      switchMap(async (response: PokemonResponse) => {
        await this.loadingService.hideLoading();

        this.showCard = true;
        console.log('result JSON', JSON.stringify(response));
        this.pokemonResponse = response;
        return of(true);
      }),
      catchError(async(error: Error) => {
        console.log('error: ', error);
        await this.alertMessage(error.message);
      })
    ).subscribe();
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
