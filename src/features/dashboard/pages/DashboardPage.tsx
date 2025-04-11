import { useAuth } from '@context/AuthContext';
// import { toast } from 'react-toastify';

const DashboardPage = () => {
  const { user } = useAuth();
  // const notify = () => {
  //   toast.success("Success! You have a new notification.");
  //   toast.error("Error message");
  //   toast.info("Info message");
  //   toast.warning("Warning message");
  // };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      Welcome {user.firstName} {user.lastName}
    </div>
  );
}

export default DashboardPage;
