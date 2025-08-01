'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function FullCalendarPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  const calendarEvents = appointments.map((appt) => ({
    title: `${appt.name} (${appt.doctorId})`,
    date: appt.date,
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
    textColor: '#fff',
  }));

  return (
    <div className="min-h-screen p-6 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-white">
          All Appointments Calendar
        </h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          height="auto"
        />
      </div>
    </div>
  );
}
