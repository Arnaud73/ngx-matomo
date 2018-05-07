import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule, MatomoModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
