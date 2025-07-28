// 📁 app/appointments/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('user');
    if (email) {
      fetch(`/api/appointments?email=${email}`)
        .then((res) => res.json())
        .then(setAppointments);
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white text-center">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a: any, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <p className="font-semibold text-lg text-blue-700 dark:text-blue-300">
                {a.name} with Doctor #{a.doctorId}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Age: {a.age} | Gender: {a.gender}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Date: {a.date} at {a.time}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">Booked as: {a.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
