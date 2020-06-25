import { TestBed } from '@angular/core/testing';
import { BrainService } from './brain.service';
describe('BrainService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BrainService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=brain.service.spec.js.map