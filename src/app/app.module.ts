import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '../@fuse/components';
import {FuseSharedModule} from '../@fuse/shared.module';
import {fuseConfig} from './fuse-config';
import {FuseModule} from '../@fuse/fuse.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SampleModule} from './main/sample/sample.module';
import {LayoutModule} from './layout/layout.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ElectronService} from './services/electron.service';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import { LoginComponent } from './components/login/login.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

Stitch.initializeDefaultAppClient('electron-ynfwr>');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    TranslateModule.forRoot(),

    // // Material moment date module
    // MatMomentDateModule,
    //
    // // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,

    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
