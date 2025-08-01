'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState('');

  const DEMO_EMAIL = 'demo@practo.com';
  const DEMO_PASSWORD = 'password123';

  const onSubmit = async (data: any) => {
    if (data.email === DEMO_EMAIL && data.password === DEMO_PASSWORD) {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (result?.user) {
        localStorage.setItem('user', result.user.email);
        router.push('/doctors');
      }
    } else {
      setError('Invalid demo credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-white mb-4">Login to PractoCare</h2>
        
        {/* Demo credentials */}
        <div className="mb-4 p-3 bg-blue-100 dark:bg-gray-700 text-sm rounded text-blue-800 dark:text-white">
          <p><strong>Demo Email:</strong> demo@practo.com</p>
          <p><strong>Demo Password:</strong> password123</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
