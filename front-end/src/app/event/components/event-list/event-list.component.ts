import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '../../../../../../back-end/models/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  host: { class: 'event-list' },
})
export class EventListComponent {
  public events$: Observable<IEvent[]>;

  public displayedColumns: string[] = [
    'name',
    'startDate',
    'endDate',
    'description',
  ];

  constructor(private _eventService: EventService) {
    this.events$ = this._eventService.events$;
  }
}
