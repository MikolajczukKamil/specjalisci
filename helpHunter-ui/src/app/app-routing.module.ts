import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginMobileComponent } from './login-mobile/login-mobile.component';
import { HomeMobileComponent } from './home-mobile/home-mobile.component';
import { RegisterMobileComponent } from './register-mobile/register-mobile.component';

const routes: Routes = [
    {path: '', component:  window.screen.width > 767 ? HomeComponent : HomeMobileComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login-mobile', component: LoginMobileComponent},
    {path: 'register-mobile', component: RegisterMobileComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
