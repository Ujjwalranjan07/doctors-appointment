// 📁 app/appointments/confirm/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function ConfirmPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
          Appointment Confirmed 🎉
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Thank you! Your appointment has been successfully booked.
        </p>
        <button
          onClick={() => router.push('/appointments/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Appointments
        </button>
        <button
          onClick={() => router.push('/doctors')}
          className="ml-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
        >
          Book Another
        </button>
      </div>
    </div>
  );
}
