import { TestBed, inject } from '@angular/core/testing';

import { MatomoInjector } from './matomo-injector.service';

describe('MatomoInjector', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MatomoInjector]
        });
    });

    it('should create service', inject([MatomoInjector], (service: MatomoInjector) => {
        expect(service).toBeTruthy();
    }));

    // it('should return 42 from getMeaning', inject([LibService], (service: LibService) => {
    //     expect(service.getMeaning()).toBe(42);
    // }));
});
