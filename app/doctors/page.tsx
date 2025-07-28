'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  rating: number;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/doctors')
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-white">
        Available Doctors
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            onClick={() => router.push(`/appointments/book/${doc.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:shadow-lg transition"
          >
            {/* ✅ External image with <img> fallback */}
            <img
              src={doc.image}
              alt={doc.name}
              className="w-24 h-24 object-cover rounded-full mb-2"
            />

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {doc.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {doc.specialty}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                {doc.experience} • ⭐ {doc.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
