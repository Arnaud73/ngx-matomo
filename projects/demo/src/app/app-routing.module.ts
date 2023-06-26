import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { MediaComponent } from './media/media.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ConsentComponent } from './consent/consent.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    title: 'User Page',
  },
  {
    path: 'consent',
    component: ConsentComponent,
    title: 'Consent Page',
  },
  {
    path: 'event',
    component: EventComponent,
    title: 'Event Page',
  },
  {
    path: 'ecommerce',
    loadChildren: () => import('./e-commerce/e-commerce.module').then((m) => m.ECommerceModule),
  },
  {
    path: 'media',
    component: MediaComponent,
    title: 'Media Page',
  },
  {
    path: 'form',
    component: FormComponent,
    title: 'Form Page',
  },
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
    title: 'Welcome Page',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
