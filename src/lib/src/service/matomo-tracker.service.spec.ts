import { TestBed, inject } from '@angular/core/testing';

import { MatomoTracker } from './matomo-tracker.service';

describe('MatomoTracker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MatomoTracker]
        });
    });

    it('should create service', inject([MatomoTracker], (service: MatomoTracker) => {
        expect(service).toBeTruthy();
    }));

    // it('should return 42 from getMeaning', inject([LibService], (service: LibService) => {
    //     expect(service.getMeaning()).toBe(42);
    // }));
});
