import { ProfileHeader, UserDetails } from '@/app/(oay)/profile/_components';

export default function Profile() {
  return (
    <main className="min-h-screen w-full p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <ProfileHeader />
        <UserDetails />
      </div>
    </main>
  );
}
