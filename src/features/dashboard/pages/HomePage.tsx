import { useAuth } from '@context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      Welcome {user.firstName} {user.lastName}
    </div>
  );
}

export default HomePage;
