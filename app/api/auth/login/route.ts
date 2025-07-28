// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Simulate a user object
  return NextResponse.json({
    user: {
      email,
      name: 'Demo User',
      token: 'mock-token-123',
    },
  });
}
