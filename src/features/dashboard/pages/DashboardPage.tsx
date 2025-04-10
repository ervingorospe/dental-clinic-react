import { useAuth } from '@context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      Welcome {user.firstName} {user.lastName}
    </div>
  );
}
