'use client';

import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [doctor, setDoctor] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  // ✅ Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // ✅ Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      const selected = data.find((d: any) => d.id === Number(id));
      setDoctor(selected);
      setLoading(false);
    };
    fetchDoctor();
  }, [id]);

  // ✅ Fetch appointments for this doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      const filtered = data.filter((a: any) => a.doctorId === id);
      setAppointments(filtered);
    };
    if (id) fetchAppointments();
  }, [id]);

  // ✅ Form submit handler
  const onSubmit = async (data: any) => {
    const email = localStorage.getItem('user');
    if (!email) {
      toast.error('Please log in first!');
      router.push('/auth/login');
      return;
    }

    const appointment = { ...data, email, doctorId: id };

    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });

    if (res.ok) {
      toast.success('Appointment Booked!');
      router.push('/appointments/confirm');
    } else {
      toast.error('Failed to book');
    }
  };

  // ✅ Prepare calendar events
  const calendarEvents = appointments.map((appt) => ({
    title: appt.name,
    date: appt.date,
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
    textColor: '#fff',
  }));

  if (loading) return <p className="text-center mt-10">Loading doctor info...</p>;
  if (!doctor) return <p className="text-center mt-10 text-red-500">Doctor not found</p>;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
        {/* 👨‍⚕️ Doctor Info */}
        <div className="flex items-center mb-6">
          <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover mr-4" />
          <div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-white">{doctor.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
          </div>
        </div>

        {/* 📋 Booking Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name')} type="text" placeholder="Your Name" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input {...register('email')} type="email" placeholder="Your Email" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input {...register('age')} type="number" placeholder="Age" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <select {...register('gender')} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            {...register('date')}
            type="date"
            required
            min={today} // ✅ Prevent past dates
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input {...register('time')} type="time" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Confirm Appointment</button>
        </form>

        {/* 📅 Toggle Calendar Button */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="mt-6 w-full bg-gray-200 dark:bg-gray-700 text-sm text-blue-600 dark:text-white py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      </div>

      {/* ✅ Calendar Section */}
      {showCalendar && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-white">Booked Appointments</h3>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            height="auto"
            eventMouseEnter={(info) => {
              const tooltip = document.createElement('div');
              tooltip.innerHTML = `<div class="bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg z-50">${info.event.title}</div>`;
              tooltip.style.position = 'absolute';
              tooltip.style.top = info.jsEvent.pageY + 'px';
              tooltip.style.left = info.jsEvent.pageX + 'px';
              tooltip.id = 'calendar-tooltip';
              document.body.appendChild(tooltip);
            }}
            eventMouseLeave={() => {
              const tooltip = document.getElementById('calendar-tooltip');
              if (tooltip) tooltip.remove();
            }}
          />
        </div>
      )}
    </div>
  );
}
