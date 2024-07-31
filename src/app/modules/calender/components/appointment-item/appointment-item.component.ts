import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarService } from 'src/app/shared/services/calender.service';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.css']
})
export class AppointmentItemComponent {
  
  @Input() appointment: any;
  @Output() dragEnded = new EventEmitter<any>();

  constructor(private calendarService: CalendarService) {}

  deleteAppointment() {
    this.calendarService.deleteAppointment(this.appointment);
  }
}
