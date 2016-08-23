import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ENV_PROVIDERS } from './environment';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ENV_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
