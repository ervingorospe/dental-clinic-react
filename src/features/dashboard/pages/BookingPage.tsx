import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '@redux/store'
import { fetchUsers } from '@redux/slices/usersSlice';
import { fetchServices } from '@redux/slices/servicesSlice';
import { useDispatch, useSelector  } from 'react-redux';
import BookingCalendar from '@features/dashboard/components/BookingCalendar'
import UserSelectInput from '@features/dashboard/components/UserSelectInput'
import ServiceSelectInput from '@features/dashboard/components/ServiceSelectInput'
import { formattedDate } from '@utils/formatter';
import { Status } from '@features/dashboard/constants';
import { useAuth } from '@context/AuthContext';
import { apiPOST } from '@features/dashboard/api/api'
import { toast } from 'react-toastify';
import { User, Datetime } from '@features/dashboard/interaces';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
    description: string;
  };
}


const BookingPage = () => {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const services = useSelector((state: RootState) => state.services.services);
  const loading = useSelector((state: RootState) => state.users.loading);
  const [selectedUser, setSelectedUser] = useState<User | null>(users.length > 0 ? users[0] : null);
  const [selectedService, setSelectedService] = useState<Service | null>(services.length > 0 ? services[0] : null);
  const [selectedDatetime, setSelectedDatetime] = useState<Datetime | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const role = 'doctor';
    const limit = null

    dispatch(fetchUsers({ role, limit }));
    dispatch(fetchServices({}))
  }, [dispatch]);


  const handleSubmit = async () => {
    let tempErrors = {};
    
    if (!selectedUser) {
      tempErrors = {
        ...tempErrors,
        user: 'Please select a Doctor'
      }
    }

    if (!selectedDatetime) {
      tempErrors ={
        ...tempErrors,
        date: 'Please select a Date and Time'
      }
    }

    if (!selectedService) {
      tempErrors = {
        ...tempErrors,
        service: 'Please select a Service'
      }
    }

    setErrors(tempErrors)

    if (Object.keys(tempErrors).length === 0) {
      setLoading(true);
      const data= {
        ...selectedDatetime,
        status: Status.CONFIRMED,
        serviceId: selectedService?.id,
        patientId: user.id,
        doctorId: selectedUser?.id
      }

      try {
        const response = await apiPOST('/api/appointments/create', data);
        
        if (response.status === 201) {
          toast.success("Your Appointment has been added!")
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
  }

  if (!loading) {
    return (
      <div className="min-h-screen items-center">
        <div className="grid gap-20 px-6 lg:px-16 py-8 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-4grid xl:grid-cols-[2fr_3fr] gap-8">
            <div className="w-full">
              <div className="mt-16 grid gap-6 w-full">
                <div className="text-lg font-bold text-gray-600">
                  <p>To start select a Doctor to view available Date and Time</p>
                </div>
                <div>
                  <UserSelectInput selectedUser={selectedUser} users={users} setSelectedUser={setSelectedUser}/>
                  {errors.user && <p className="mt-1 text-sm text-red-500">{errors.user}</p>}
                </div>
                <div>
                  <ServiceSelectInput selectedService={selectedService} setSelectedService={setSelectedService} services={services}/>
                  {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>
                <div className="text-sm text-gray-600 tracking-wide space-y-2">
                  {
                    selectedUser && (
                      <>
                        <p><strong>Doctor:</strong> { selectedUser.firstName } { selectedUser.lastName }</p>
                      </>
                    )
                  }
  
                  {
                    selectedDatetime && (
                      <>
                        <p><strong>Date:</strong> { formattedDate(selectedDatetime.date) }</p>
                        <p><strong>Time:</strong> { selectedDatetime.startTime } - { selectedDatetime.endTime }</p>
                      </>
                    )
                  }
  
                  {
                    selectedService && (
                      <>
                        <p><strong>Purpose:</strong> { selectedService.category.name } - { selectedService.name }</p>
                        <p><strong>Description:</strong> { selectedService.description }</p>
                        <p><strong>Price:</strong> ${ selectedService.price }</p>
                      </>
                    )
                  }
  
                  <button onClick={() => handleSubmit()} disabled={isLoading} className="mt-6 cursor-pointer inline-flex bg-green-600 rounded-md hover:bg-green-700 text-white px-4 py-2 text-center">
                    {isLoading ? 'Submitting' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            </div>
            <BookingCalendar selectedUser={selectedUser} setSelectedDatetime={setSelectedDatetime}/>
          </div>
        </div>
      </div>
    );
  }
};

export default BookingPage;
