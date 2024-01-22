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
import { MapService, NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GeocodingService } from './map/map-localisation/geocoding.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneralInterceptor } from './interceptors/general/general.interceptor';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './main/components/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './main/main.component';
import { FootbarComponent } from './main/components/footbar/footbar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { FiltersComponent } from './home/filters/filters.component';
import { ServiceOrderingComponent } from './service-ordering/service-ordering.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MapSelectLocationComponent } from './map/map-select-location/map-select-location.component';
import { ProfileComponent } from './profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MessagesComponent } from './messages/messages/messages.component';
import { ServicePricingComponent } from './messages/service-pricing/service-pricing.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview/profile-overview.component';
import { StarComponent } from './profile-overview/components/star/star.component';
import { StarsComponent } from './profile-overview/components/stars/stars.component';
import { AddCommentComponent } from './profile-overview/components/add-comment/add-comment.component';
import { CustomSlideToggleComponent } from './components/custom-slide-toggle/custom-slide-toggle.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        HomeComponent,
        LoginComponent,
        MapLocalisationComponent,
        ButtonComponent,
        NavbarComponent,
        PageNotFoundComponent,
        MainComponent,
        FootbarComponent,
        FiltersComponent,
        ServiceOrderingComponent,
        ProfileComponent,
        MapSelectLocationComponent,
        MessagesComponent,
        ServicePricingComponent,
        ProfileOverviewComponent,
        StarComponent,
        StarsComponent,
        AddCommentComponent,
        CustomSlideToggleComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterOutlet,
        FormsModule,
        MatSnackBarModule,
        MatButtonModule,
        NgxMapboxGLModule,
        MatIconModule,
        MatButtonToggleModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
    ],
    providers: [
        GeocodingService,
        HttpClient,
        MapService,
        { provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
