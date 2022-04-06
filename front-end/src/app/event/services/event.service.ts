import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IEvent } from '../../../../../back-end/models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public baseUrl: string = `${environment.apiUrl}`;
  public events$: Observable<IEvent[]>;

  private _eventsChanged$ = new BehaviorSubject(true);

  constructor(private http: HttpClient) {
    // BehaviourSubject used to simulate NGRX Store
    this.events$ = this._eventsChanged$.pipe(switchMap(() => this.getEvents()));
  }

  public getEvents(): Observable<IEvent[]> {
    return <Observable<IEvent[]>>(
      this.http
        .get(`${this.baseUrl}/events`)
        .pipe(map((events) => this.formatData(events)))
    );
  }

  public postEvent(data: IEvent): Observable<number> {
    return this.http
      .post<number>(`${this.baseUrl}/event`, data)
      .pipe(tap(() => this._eventsChanged$.next(true)));
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
