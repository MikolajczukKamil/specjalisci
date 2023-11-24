import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapLocalisationComponent } from './map/map-localisation/map-localisation.component';
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import {GeocodingService} from "./map/map-localisation/geocoding.service";;
import {MatCardModule} from "@angular/material/card";
import {environment} from "../environments/environment.local";
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneralInterceptor } from './interceptors/general/general.interceptor';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [AppComponent, RegisterComponent, HomeComponent, LoginComponent, MapLocalisationComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterOutlet,
        FormsModule,
        MatSnackBarModule,
        NgxMapboxGLModule.withConfig({accessToken: environment.mapToken}),
    ],
    providers: [GeocodingService, HttpClient, { provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
