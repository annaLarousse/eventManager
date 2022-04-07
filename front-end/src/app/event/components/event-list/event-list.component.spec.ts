import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { EventService } from '../../services/event.service';
import { EventListComponent } from './event-list.component';
describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let mockData: any[] = [{ test: 'test' }];
  let eventServiceMock = {
    events$: of(mockData),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListComponent],
      providers: [{ provide: EventService, useValue: eventServiceMock }],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize events$ with the data returned from EventService', () => {
    expect(lastValueFrom(component.events$)).resolves.toEqual(mockData);
  });

  it('should display a list of all events', () => {
    expect(fixture).toMatchSnapshot();
  });
});
