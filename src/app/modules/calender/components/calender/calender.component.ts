import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CalendarService } from 'src/app/shared/services/calender.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit , OnDestroy {

  viewDate: Date = new Date();
  daysInMonth: Date[] = [];

  constructor(private calendarService: CalendarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const start = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const end = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    this.daysInMonth = [];
    for (let i = start.getDate(); i <= end.getDate(); i++) {
      this.daysInMonth.push(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), i));
    }
  }

  previousMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getAppointmentsForDay(day: Date) {
    return this.calendarService.getAppointmentsForDay(day);
  }

  addAppointment() {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '250px',
      data: { date: this.viewDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calendarService.addAppointment(result);
        this.generateCalendar();
      }
    });
  }

  onDragEnded(event: any, appointment: any) {
    const newDate = this.calculateNewDate(event, appointment);
    this.calendarService.moveAppointment(appointment, newDate);
    this.generateCalendar();
  }

  calculateNewDate(event: any, appointment: any): Date {
    // Calculate new date based on drag event
    return new Date();
  }

  onDrop(event: CdkDragDrop<any[]>, day: Date) {
    const appointment = event.item.data;
    const newDate = new Date(day);
    newDate.setHours(parseInt(appointment.time.split(':')[0], 10));
    newDate.setMinutes(parseInt(appointment.time.split(':')[1], 10));
    this.calendarService.moveAppointment(appointment, newDate);
    this.generateCalendar();
  }

  ngOnDestroy(): void {
  }
}
