export const GET = async () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Cardiologist',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      experience: '10 yrs',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Dr. Rahul Mehra',
      specialty: 'Orthopedic',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
      experience: '8 yrs',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Dr. Ayesha Khan',
      specialty: 'Dermatologist',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      experience: '6 yrs',
      rating: 4.3,
    },
  ];

  return new Response(JSON.stringify(doctors), {
    headers: { 'Content-Type': 'application/json' },
  });
};