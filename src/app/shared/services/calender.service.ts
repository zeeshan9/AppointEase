import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private appointments = new BehaviorSubject<any[]>([]);

  getAppointmentsForDay(date: Date) {
    const appointments = this.appointments.getValue();
    return appointments.filter(app => new Date(app.date).toDateString() === date.toDateString());
  }

  addAppointment(appointment: any) {
    const appointments = this.appointments.getValue();
    // Ensure date is a Date object
    appointment.date = new Date(appointment.date);
    appointments.push(appointment);
    this.appointments.next(appointments);
  }

  deleteAppointment(appointment: any) {
    const appointments = this.appointments.getValue();
    const index = appointments.indexOf(appointment);
    if (index > -1) {
      appointments.splice(index, 1);
      this.appointments.next(appointments);
    }
  }

  moveAppointment(appointment: any, newDate: Date) {
    this.deleteAppointment(appointment);
    appointment.date = newDate;
    this.addAppointment(appointment);
  }
}
