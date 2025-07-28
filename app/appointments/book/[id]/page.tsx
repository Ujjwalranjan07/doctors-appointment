'use client';

import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  // ✅ Submit appointment
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
      headers: {
        'Content-Type': 'application/json', // 🧠 required!
      },
      body: JSON.stringify(appointment),
    });

    if (res.ok) {
      toast.success('Appointment Booked!');
      router.push('/appointments/confirm');
    } else {
      toast.error('Failed to book');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading doctor info...</p>;
  if (!doctor) return <p className="text-center mt-10 text-red-500">Doctor not found</p>;

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 px-4 py-6">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        {/* 👨‍⚕️ Doctor Details */}
        <div className="flex items-center mb-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-white">
              {doctor.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
          </div>
        </div>

        {/* 📋 Appointment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name')}
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            {...register('email')}
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            {...register('age')}
            type="number"
            placeholder="Age"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <select
            {...register('gender')}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            {...register('date')}
            type="date"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            {...register('time')}
            type="time"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
