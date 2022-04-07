import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IEvent } from '../../../../../back-end/models/event';
import { environment } from '../../../environments/environment';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let backend: HttpTestingController;

  let mockValidDataToAdd: IEvent = {
    id: 1,
    name: 'test',
    description: 'test',
    startDate: new Date('2022-04-06T21:30:00.000Z'),
    endDate: new Date('2022-04-07T21:30:00.000Z'),
  };

  let mockInvalidDataToAdd: IEvent = {
    id: 1,
    name: 'test',
    description: 'test',
    startDate: new Date('2022-04-06T21:30:00.000Z'),
    endDate: new Date('2022-04-01T21:30:00.000Z'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
    });
    service = TestBed.inject(EventService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  // TODO - Replace toPromise()
  describe('getEvents()', () => {
    it('should send a GET/events request', async () => {
      const promise = service.getEvents().toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/events`);
      expect(req.request.method).toEqual('GET');
    });

    it('should return formatted data (json -> array)', async () => {
      const promise = service.getEvents().toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/events`);
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
      const promise = service.postEvent(mockValidDataToAdd).toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/event`);
      expect(req.request.method).toEqual('POST');
    });

    it('should return success notification if event added successfully', async () => {
      const promise = service.postEvent(mockValidDataToAdd).toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/event`);
      req.flush(mockValidDataToAdd, {
        status: 201,
        statusText: '',
      });
      const notificationResult = await promise;
      expect(notificationResult?.type).toEqual('success');
    });

    it('should call _eventChanged.next() if event added successfully', async () => {
      const spy = jest.spyOn(service.eventsChanged$, 'next');
      expect(spy).not.toHaveBeenCalled();
      const promise = service.postEvent(mockInvalidDataToAdd).toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/event`);
      req.flush(mockInvalidDataToAdd, {
        status: 201,
        statusText: '',
      });
      expect(spy).toHaveBeenCalled();
    });

    it('should return success notification if event add failed', async () => {
      const promise = service.postEvent(mockInvalidDataToAdd).toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/event`);
      req.flush(mockInvalidDataToAdd, {
        status: 400,
        statusText: '',
      });
      const notificationResult = await promise;
      expect(notificationResult?.type).toEqual('error');
    });

    it('should not call _eventChanged.next() if event add failed', async () => {
      const spy = jest.spyOn(service.eventsChanged$, 'next');
      expect(spy).not.toHaveBeenCalled();
      const promise = service.postEvent(mockInvalidDataToAdd).toPromise();
      const req = backend.expectOne(`${environment.apiUrl}/event`);
      req.flush(mockInvalidDataToAdd, {
        status: 400,
        statusText: '',
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
