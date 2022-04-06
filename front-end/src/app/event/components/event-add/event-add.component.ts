import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take, tap } from 'rxjs';
import { IEvent } from '../../../../../../back-end/models/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
  host: { class: 'event-add' },
})
export class EventAddComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor(private _eventService: EventService) {}

  public onAddNewEvent(): void {
    const data: IEvent = {
      ...this.form.value,
      startDate: new Date(this.form.value?.startDate).toISOString(),
      endDate: new Date(this.form.value?.endDate).toISOString(),
    };
    this._eventService
      .postEvent(data)
      .pipe(
        tap((notification) => {
          if (notification?.type === 'success') {
            this.form.reset();
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
