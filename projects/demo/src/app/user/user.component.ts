import { Component, OnInit } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [],
})
export class UserComponent implements OnInit {
  public readonly getUserIdCode =
    'this.matomoTracker.getUserId().then(console.log);';
  public readonly setUserIdCode = "this.matomoTracker.setUserId('MyUserId');";
  public readonly resetUserIdCode = 'this.matomoTracker.resetUserId();';

  public userId = '';
  public visitorId = '';
  public visitorInfo: Array<string> = [];

  public userIdForm = this.formBuilder.group({
    userId: ['', Validators.required],
  });

  /**
   * Creates an instance of UserComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   * @param formBuilder Instance of FormBuilder provided by DI.
   */
  constructor(
    private readonly matomoTracker: MatomoTracker,
    private readonly formBuilder: FormBuilder
  ) {}

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
