import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { IEvent } from '../../../../../back-end/models/event';
import { INotification } from '../../../../../back-end/models/notification';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public baseUrl: string = `${environment.apiUrl}`;
  public events$: Observable<IEvent[]>;

  private _eventsChanged$ = new BehaviorSubject(true);

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    // BehaviourSubject used to simulate NGRX Store
    this.events$ = this._eventsChanged$.pipe(switchMap(() => this.getEvents()));
  }

  public getEvents() {
    return <Observable<IEvent[]>>(
      this.http
        .get(`${this.baseUrl}/events`)
        .pipe(map((events) => this.formatData(events)))
    );
  }

  public postEvent(data: IEvent) {
    return this.http.post<INotification>(`${this.baseUrl}/event`, data).pipe(
      map((response) => {
        this._eventsChanged$.next(true);
        return <INotification>{ type: 'success', message: response.message };
      }),
      catchError((error) => {
        return of(<INotification>{
          type: 'error',
          message: error?.error?.message,
        });
      }),
      tap((notification) => {
        this._snackBar.open(notification?.message, undefined, {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: `snackbar__${notification.type}`,
        });
      })
    );
  }

  public formatData(dataObject: Object): IEvent[] {
    const formattedData: IEvent[] = [];
    if (dataObject) {
      for (const [key, user] of Object.entries(dataObject)) {
        formattedData.push(user);
      }
    }
    return formattedData;
  }
}
