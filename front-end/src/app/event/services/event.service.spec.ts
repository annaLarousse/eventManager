import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  describe('getEvents()', () => {
    it('should send a GET/events request', async () => {
      // TODO - Replace toPromise()
      const promise = service.getEvents().toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/events`);
      expect(req.request.method).toEqual('GET');
      req.flush({}, {});
      const result = await promise;
      expect(result).toEqual([]);
    });
  });

  describe('formatData()', () => {
    it('should return an array from an object', () => {
      const inputData: Object = { 1: { name: 'test1' }, 2: { name: 'test2' } };
      const expectedData: any[] = [{ name: 'test1' }, { name: 'test2' }];
      const outputData = service.formatData(inputData);
      expect(outputData).toEqual(expectedData);
    });
  });

  describe('postEvent', () => {
    it('should send a POST/event request', async () => {
      const data = {
        id: 1,
        name: 'test',
        description: 'test',
        startDate: new Date('2022-04-06T21:30:00.000Z'),
        endDate: new Date('2022-04-07T21:30:00.000Z'),
      };
      // TODO - Replace toPromise()
      const promise = service.postEvent(data).toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/event`);
      expect(req.request.method).toEqual('POST');
    });
  });
});
