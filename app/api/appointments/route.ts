let appointmentData: any[] = [];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  const filtered = email
    ? appointmentData.filter((a) => a.email === email)
    : appointmentData;

  return new Response(JSON.stringify(filtered), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  try {
    const newAppointment = await req.json();
    appointmentData.push(newAppointment);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
    });
  }
}
