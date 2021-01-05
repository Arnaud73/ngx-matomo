import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { MediaComponent } from './media/media.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ConsentComponent } from './consent/consent.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path: 'user', component: UserComponent, data: { matomoTitle: 'User Page' } },
  { path: 'consent', component: ConsentComponent, data: { matomoTitle: 'Consent Page' } },
  { path: 'event', component: EventComponent, data: { matomoTitle: 'Event Page' } },
  { path: 'ecommerce', component: ECommerceComponent, data: { matomoTitle: 'eCommerce Page' } },
  { path: 'media', component: MediaComponent, data: { matomoTitle: 'Media Page' } },
  { path: 'form', component: FormComponent, data: { matomoTitle: 'Form Page' } },
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
    data: { matomoTitle: 'Welcome Page' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
