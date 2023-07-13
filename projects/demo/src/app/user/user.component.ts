import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [],
})
export class UserComponent implements OnInit {
  private readonly matomoTracker = inject(MatomoTracker);

  public readonly getUserIdCode = 'this.matomoTracker.getUserId().then(console.log);';
  public readonly setUserIdCode = "this.matomoTracker.setUserId('MyUserId');";
  public readonly resetUserIdCode = 'this.matomoTracker.resetUserId();';

  public userId = '';
  public visitorId = '';
  public visitorInfo: Array<string> = [];

  public userIdForm = inject(FormBuilder).group({
    userId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.matomoTracker.getUserId().then((uid) => {
      this.userId = uid;
    });
    this.matomoTracker.getVisitorId().then((vid) => {
      this.visitorId = vid;
    });
    this.matomoTracker.getVisitorInfo().then((vinf) => {
      this.visitorInfo = vinf;
    });
  }

  onUserIdSubmit(): void {
    this.matomoTracker.setUserId(this.userIdForm.value.userId || '');
    this.userIdForm.reset();

    this.matomoTracker.getUserId().then((uid) => {
      this.userId = uid;
    });
  }

  onUserIdReset(): void {
    this.matomoTracker.resetUserId();
    this.matomoTracker.getUserId().then((uid) => {
      this.userId = uid;
    });
  }
}
