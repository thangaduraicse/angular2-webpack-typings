import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ENV_PROVIDERS } from './environment';
import { AppState } from './app.service';
import { AppComponent } from './app.component';

const APP_PROVIDERS = [
  AppState
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
  hmrOnInit(store) {
    if (!store || !store.state) return;
    this.appState.set('state', store.state);
    delete store.state;
  }
  hmrOnDestroy(store) {
    var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    var state = this.appState.state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation)
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts;
  }
}
