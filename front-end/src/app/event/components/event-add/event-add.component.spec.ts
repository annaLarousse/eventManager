import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { EventService } from '../../services/event.service';
import { EventAddComponent } from './event-add.component';

describe('EventAddComponent', () => {
  let component: EventAddComponent;
  let fixture: ComponentFixture<EventAddComponent>;

  let eventServiceMock = {
    postEvent: () =>
      of({ type: 'success', message: 'Event added successfully' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventAddComponent],
      providers: [{ provide: EventService, useValue: eventServiceMock }],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the add new event form', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('AddNewEvent()', () => {
    it('should call postEvent() of EventService', () => {
      const spyForm = jest.spyOn(component.form, 'reset');
      const spyPostEvent = jest.spyOn(eventServiceMock, 'postEvent');
      expect(spyPostEvent).not.toHaveBeenCalled();
      component.onAddNewEvent();
      expect(spyPostEvent).toHaveBeenCalled();
    });

    it('should reset the form after event added succeffully', () => {
      const spyForm = jest.spyOn(component.form, 'reset');
      component.onAddNewEvent();
      expect(spyForm).toHaveBeenCalled();
    });
  });
});
