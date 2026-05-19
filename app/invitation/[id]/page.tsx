import { notFound } from 'next/navigation';
import guests from '../../../data/guests.json';
import InvitationContainer from '@/components/CollageLayout';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvitationPage({ params }: PageProps) {
  const { id } = await params;
  const guest = guests.find((g) => g.id === id);

  if (!guest) {
    notFound();
  }

  return <InvitationContainer guestName={guest.name} />;
}