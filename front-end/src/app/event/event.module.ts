import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventPageComponent } from './components/event-page/event-page.component';

@NgModule({
  declarations: [EventPageComponent, EventListComponent],
  imports: [CommonModule, HttpClientModule, MatTableModule],
  exports: [EventPageComponent],
})
export class EventModule {}
