import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch  } from 'react-redux';
import { AppDispatch } from '@redux/store'
import { apiGET, apiPUT } from '@features/dashboard/api/api'
import { toast } from 'react-toastify';
import AppointmentDetails from '@features/dashboard/components/AppointmentDetails'
import { Appointment, User, Datetime } from '../interaces';
import { Status } from '@features/dashboard/constants';
import { fetchAppointments, updateAppointment } from '@redux/slices/appointmentsSlice';
import Calendar from '@features/dashboard/components/Calendar'
import { formattedDate } from '@utils/formatter';

const Reschedule = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedDatetime, setSelectedDatetime] = useState<Datetime | null>(null);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await apiGET(`/api/appointments/${appointmentId}`);

        if (response.status !== 200) {
          toast(response.data.message)
          return;
        } 
        
        const path = '/api/appointments/doctor'
        const userId = response.data.appointment.doctor?.id;
        const status = Status.CONFIRMED.toString(); 
        const startDate = new Date().toISOString();

        dispatch(fetchAppointments({ path, userId, status, startDate }));
        setSelectedUser(response.data.appointment.doctor)
        setAppointment(response.data.appointment)
      } catch (error) {
        toast("Something went wrong. Please try again later")
      }
    }
    
    getAppointment()
  }, [])

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      ...selectedDatetime,
      status: Status.CONFIRMED,
      serviceId: appointment?.service.id,
      patientId: appointment?.patient.id,
      doctorId: appointment?.doctor.id
    }

    try {
      const response = await apiPUT(`/api/appointments/update/${appointment?.id}`, data);
      
      if (response.status === 200) {
        toast.success("Your Appointment has been updated!")
        setAppointment(response.data.appointment)
        setSelectedDatetime(null);
        dispatch(updateAppointment(response.data.appointment));
        setLoading(false);
      } else {
        toast.error(response.data.message)
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong, Please try again later")
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen items-center">
      <div className="grid gap-20 px-6 lg:px-16 py-8 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-4grid xl:grid-cols-[2fr_3fr] gap-8">
          <div className="w-full">
            <div className="mt-16 grid gap-6 w-full">
              {/* <div>
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
              </div> */}
              {
                appointment && (
                  <div className="text-base text-gray-600 tracking-wide space-y-2 p-8 bg-white rounded-md shadow-md">
                    <AppointmentDetails appointment={appointment}/>
                    
                    <p className="mt-8 font-semibold text-base tracking">{ selectedDatetime ? 'Change Date and Time to:' : 'Select a date to reschedule your Appointment' }</p>

                    {
                      selectedDatetime && (
                        <>
                          <table className="w-full text-left">
                            <tbody>
                              <tr>
                                <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Date:</strong></p></td>
                                <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ formattedDate(selectedDatetime.date) }</p></td>
                              </tr>
                              <tr>
                                <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Change to Time:</strong></p></td>
                                <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ selectedDatetime.startTime } - { selectedDatetime.endTime }</p></td>
                              </tr>
                            </tbody>
                          </table>
                          <button onClick={() => handleSubmit()} disabled={isLoading} className="mt-6 cursor-pointer inline-flex bg-green-600 rounded-md hover:bg-green-700 text-white px-4 py-2 text-center">
                            {isLoading ? 'Submitting' : 'Reschedule Appointment'}
                          </button>
                        </>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
          <div className="w-auto h-auto max-w-full min-h-[400px]">
            <Calendar setSelectedDatetime={setSelectedDatetime} selectedUser={selectedUser}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reschedule