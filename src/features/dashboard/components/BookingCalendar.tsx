import React, { useEffect } from "react";
import { useDispatch  } from 'react-redux';
import { AppDispatch } from '@redux/store'

import { Status } from '@features/dashboard/constants';
import { fetchAppointments } from '@redux/slices/appointmentsSlice';
import Calendar from '@features/dashboard/components/Calendar'

interface User {
  id: number,
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
}
interface BookingCalendarProps {
  selectedUser: User | null;
  setSelectedDatetime: any;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedUser, setSelectedDatetime }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedUser) {
      const path = '/api/appointments/doctor'
      const userId = selectedUser?.id;
      const status = Status.CONFIRMED.toString();
      const limit = 10; 

      dispatch(fetchAppointments({ path, userId, status, limit }));
    }
  }, [selectedUser]);

  return (
    <>
      <div className="w-auto h-auto max-w-full min-h-[400px]">
        <h2>Doctor Availability</h2>
        <Calendar setSelectedDatetime={setSelectedDatetime} selectedUser={selectedUser}/>
      </div>
    </>
    
  );
};

export default BookingCalendar;
