import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchAppointments } from '@redux/slices/appointmentsSlice';
import MenuDropdown from '@features/dashboard/components/MenuDropdown'
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { RootState, AppDispatch } from '@redux/store'
import { format } from 'date-fns';
import { Status } from '@features/dashboard/constants';

const formattedDate = (date: string) => {
  const parsedDate = new Date(date);
  return format(parsedDate, 'MMMM dd, yyyy');
};

const UpcomingAppointments = () => {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => state.appointments.appointments);
  const loading = useSelector((state: RootState) => state.appointments.loading);

  useEffect(() => {
    const userId = user.id;
    const status = Status.CONFIRMED.toString();
    const limit = 10; 

    dispatch(fetchAppointments({ userId, status, limit }));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md shadow-md bg-white p-8">
      <h2 className="font-bold text-xl tracking-wider text-gray-700">Upcoming Appointments</h2>
      <hr className="border-b border-green-600 my-4"/>

      <ul>
        {
          appointments?.map((data: any) => {
            return (
              <li className="font-semibold border-b border-gray-400 last:border-none py-6" key={data.id}>
                <h3 className="text-base md:text-lg text-gray-600">{data.doctor.firstName} {data.doctor.lastName}</h3>
                <div className="flex justify-between items-start">
                  <div className="font-semibold">
                    <p className="text-xs md:text-sm text-green-600">{ formattedDate(data.date) } at { data.startTime } - { data.endTime }</p>
                    <p className="text-xs md:text-sm text-gray-500">{ data.service.category } - { data.service.name }</p>
                    <span className="inline-flex mt-2 md:hidden text-xs px-2 py-1 bg-green-400 rounded-full text-gray-700 lowercase">{ data.status }</span>
                  </div>
                  <div className="flex items-center space-x-8 z-20">
                    <span className="hidden md:block text-xs px-2 py-2 bg-green-400 rounded-full text-gray-700 lowercase">{ data.status }</span>
                    <MenuDropdown appointmentId={data.id}/>
                  </div>
                </div>
              </li>
            )
          })
        }

        {
          (!appointments || appointments.length ===0) &&
          (
            <li className="text-gray-600 italic text-sm">No Upcoming Appointments</li>
          ) 
        }
      </ul>
      
      <hr className="border-b border-green-600 my-4"/>

      <Link to="/appointmentts" className="text-sm text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md">
        View More
      </Link>
    </div>
  )
}

export default UpcomingAppointments