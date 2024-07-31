import { Component } from '@angular/core';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-calender-page',
  templateUrl: './calender-page.component.html',
  styleUrls: ['./calender-page.component.css']
})
export class CalenderPageComponent {
  appointments: Appointment[] = [];

  onAppointmentAdded(appointment: Appointment) {
    this.appointments.push(appointment);
  }

  onAppointmentMoved(event: { appointment: Appointment, newDate: Date }) {
    const index = this.appointments.findIndex(a => a.id === event.appointment.id);
    if (index !== -1) {
      this.appointments[index].date = event.newDate;
    }
  }

  onAppointmentDeleted(appointment: Appointment) {
    this.appointments = this.appointments.filter(a => a.id !== appointment.id);
  }
}
