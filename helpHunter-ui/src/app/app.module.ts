import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapLocalisationComponent } from './map/map-localisation/map-localisation.component';
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import {GeocodingService} from "./map/map-localisation/geocoding.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {environment} from "../environments/environment.local";

@NgModule({
  declarations: [
    AppComponent,
    MapLocalisationComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxMapboxGLModule.withConfig({accessToken: environment.mapToken}),
        MatCardModule
    ],
  providers: [GeocodingService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
