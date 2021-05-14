import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [],
})
export class FormComponent implements AfterViewInit {
  public foodForm = this.formBuilder.group({
    favorite: ['', Validators.required],
    comment: [''],
  });

  /**
   * Creates an instance of FormComponent.
   *
   * @param formBuilder Instance of FormBuilder provided by DI.
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly matomoTracker: MatomoTracker
  ) {}

  /**
   * Angular AfterViewInit lifecycle hook.
   */
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit(): void {
    // TODO To be implemented when Form Analytics will be supported.
    // const form = document.getElementById('foodForm');
    // this.matomoTracker.scanForForms(form);
    // this.matomoTracker.trackForms(form);
  }

  onSubmit(): void {
    console.log('Submit!');
  }
}
