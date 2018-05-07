import { Component } from '@angular/core';
import { LibService } from 'ngx-matomo';

@Component({
    selector: 'integration-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    meaning: number;
    constructor(libService: LibService) {
        this.meaning = libService.getMeaning();
    }
}
