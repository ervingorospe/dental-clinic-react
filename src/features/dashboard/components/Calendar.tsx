import React, { useState, useEffect } from "react";
import { useSelector  } from 'react-redux';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { calendarEvents } from '@utils/calendar'
import { RootState } from '@redux/store'
import { User } from '@features/dashboard/interaces'
interface CalendarProps {
  selectedUser: User | null;
  setSelectedDatetime: any;
}

const Calendar: React.FC<CalendarProps> = ({selectedUser, setSelectedDatetime}) => {
  const [events, setEvents] = useState<any[]>([]);
  const appointments = useSelector((state: RootState) => state.appointments.appointments);

  useEffect(() => {
    if (appointments) {
      setEvents(calendarEvents(appointments));
    }
  }, [appointments]);

    const handleEventClick = (info: any) => {
    const { start, end } = info.event;

    const date = format(start, "yyyy-MM-dd");
    const startTime = format(start, "hh:mm a");
    const endTime = end ? format(end, "hh:mm a") : null;

    setSelectedDatetime({
      date,
      startTime,
      endTime
    })
  };

  return (
    <div>
      <FullCalendar
        aspectRatio={1.5} 
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={selectedUser ? events : []}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
          hour12: true, // Ensure 12-hour format with AM/PM
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        validRange={{
          start: new Date().toISOString().split("T")[0],
        }}
        eventClick={(info) => {
          if (info.event.extendedProps.isBooked) {
            info.jsEvent.preventDefault();
            return; // ignore click
          }
      
          // handle click for available event
          handleEventClick(info);
        }}
      />
    </div>
  )
}

export default Calendar

