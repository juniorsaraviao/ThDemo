import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonDetailPageRoutingModule } from './pokemon-detail-routing.module';

import { PokemonDetailPage } from './pokemon-detail.page';
import { ImgUrlPipe } from '../pipes/img-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonDetailPageRoutingModule,
    ImgUrlPipe
  ],
  declarations: [PokemonDetailPage]
})
export class PokemonDetailPageModule {}
