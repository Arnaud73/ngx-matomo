import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatomoModule } from 'ngx-matomo';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, MatomoModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
