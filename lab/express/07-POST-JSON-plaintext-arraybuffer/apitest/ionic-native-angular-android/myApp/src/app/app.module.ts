import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HTTP],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, File, Base64],
  bootstrap: [AppComponent],
})
export class AppModule {}
