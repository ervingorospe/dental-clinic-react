import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchAppointments } from '@redux/slices/appointmentsSlice';
import { useAuth } from '@context/AuthContext';
import { RootState, AppDispatch } from '@redux/store'
import { formattedDate } from '@utils/formatter'
import { Status } from '../constants';
import MenuDropdown from '@features/dashboard/components/MenuDropdown'

const AppointmentList = () => {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => state.appointments.appointments);
  const loading = useSelector((state: RootState) => state.appointments.loading);

  useEffect(() => {
    const userId = user.id;
    const limit = 10; 

    dispatch(fetchAppointments({ userId, limit }));
  }, [dispatch]);

  if (!loading) {
    return (
      <div className="rounded-md shadow-md bg-white p-8">
        <h2 className="font-bold text-xl tracking-wider text-gray-700">Appointments</h2>
        <hr className="border-b border-green-600 my-4"/>
  
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Patient
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Doctor
              </th>
              <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Date and Time
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Notes
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Price
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                status
              </th>
              <th>
  
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              appointments.length ? (
                appointments?.map((appointment) => {
                  const statusColor = appointment.status === Status.CONFIRMED ? 'bg-green-600 text-white' : appointment.status === Status.COMPLETED ? 'bg-green-400 text-gray-600' : 'bg-red-600 text-white'
                  
                  return (
                    <tr key={appointment.id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        { appointment.patient.firstName } { appointment.patient.lastName }
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{ appointment.doctor.firstName } { appointment.doctor.lastName }</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <p>{ formattedDate(appointment.date) }</p>
                        <p>{ appointment.startTime } - { appointment.endTime }</p>
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <p>{ appointment.service.category } - { appointment.service.name } </p>
                        <p>{ appointment.service.description }</p>
                      </td>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        { appointment.notes ? appointment.notes : '--' }
                      </td>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        ${ appointment.service.price }
                      </td>
                      <td className="py-4 pr-3 pl-4 lowercase text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        <span className={`${statusColor} rounded-full px-2 py-1`}>
                          { appointment.status }
                        </span>
                      </td>
                      <td>
                        <MenuDropdown appointment={appointment}/>
                      </td>
                    </tr>
                  )
                })
              ) :
              <tr>
                <td className="italic text-gray-600 text-base mt-4">No Appointments</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AppointmentList