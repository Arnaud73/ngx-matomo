import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { MatomoModule } from 'ngx-matomo';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MediaComponent } from './media/media.component';
import { FormComponent } from './form/form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ConsentComponent } from './consent/consent.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaComponent,
    FormComponent,
    WelcomeComponent,
    UserComponent,
    ConsentComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatomoModule.forRoot(environment.matomoConfig),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
