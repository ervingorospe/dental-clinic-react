import { useEffect } from 'react';
import { RootState, AppDispatch } from '@redux/store'
import { fetchUsers } from '@redux/slices/usersSlice';
import { useDispatch, useSelector  } from 'react-redux';

const FeaturedUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    const role = 'doctor';
    const limit = 6; 

    dispatch(fetchUsers({ role, limit }));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md shadow-md bg-white p-8">
      <h2 className="font-bold text-xl tracking-wider text-gray-700">Featured Doctors</h2>
      <hr className="border-b border-green-600 my-4"/>

      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Contact
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.email}</td>
              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.phoneNumber}</td>
              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.role}</td>
            </tr>
          ))}

          {
            (!users || users.length ===0) &&
            (
              <tr>
                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 italic">No Featured Doctor</td>
              </tr>
            ) 
          }
        </tbody>
      </table>
    </div>
  )
}

export default FeaturedUsers