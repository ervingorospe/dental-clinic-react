import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";

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
  const [events, setEvents] = useState<any[]>([]);

  // Generate available times from 8 AM to 5 PM
  const generateAvailableTimes = () => {
    const availableTimes: string[] = [];
    for (let hour = 8; hour <= 17; hour++) {
      const startTimeFormatted = format(new Date().setHours(hour, 0, 0, 0), "h:mm a");
      const endTimeFormatted = format(new Date().setHours(hour + 1, 0, 0, 0), "h:mm a");
      availableTimes.push(`${startTimeFormatted} - ${endTimeFormatted}`);
    }
    return availableTimes;
  };

  useEffect(() => {
    const availableTimes = generateAvailableTimes();
  
    // Create events for the calendar (excluding Sundays)
    const calendarEvents: any = [];
  
    // Get the next 60 days and generate events for each day (excluding Sunday)
    for (let i = 1; i < 30; i++) {
      const currentDay = new Date();
      currentDay.setDate(currentDay.getDate() + i);
      
      // Skip Sundays (day 0)
      if (currentDay.getDay() === 0) continue;
  
      // Format the date as YYYY-MM-DD
      const formattedDate = currentDay.toISOString().split('T')[0];
  
      availableTimes.forEach((timeSlot) => {
        const [startTime, startMeridiem, , endTime, endMeridiem] = timeSlot.split(" ");
        
        const convertTo24HourFormat = (time: string, meridiem: string) => {
          let [hour, minute] = time.split(":").map(Number);
      
          // Convert to 24-hour format
          if (meridiem === "PM" && hour !== 12) {
            hour += 12;
          } else if (meridiem === "AM" && hour === 12) {
            hour = 0; // Midnight case
          }
      
          return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        };
      
        const formattedStartTime = convertTo24HourFormat(startTime, startMeridiem);
        const formattedEndTime = convertTo24HourFormat(endTime, endMeridiem);
      
        calendarEvents.push({
          start: `${formattedDate}T${formattedStartTime}:00`,
          end: `${formattedDate}T${formattedEndTime}:00`,
          allDay: false,
          color: "#38a169",
        });
      });
      
    }
  
    setEvents(calendarEvents);
  }, []);

  const handleEventClick = (info: any) => {
    const { start, end } = info.event;
    
    // Format the date and time using date-fns
    const date = format(start, "yyyy-MM-dd"); // Format date to YYYY-MM-DD
    const startTime = format(start, "hh:mm a"); // Format start time to 12-hour format
    const endTime = end ? format(end, "hh:mm a") : null; // Format end time to 12-hour format if available

    setSelectedDatetime({
      date,
      startTime,
      endTime
    })
  };

  return (
    <>
      <div className="w-auto h-auto max-w-full min-h-[400px]">
        <h2>Doctor Availability</h2>
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
          eventClick={handleEventClick}
        />
      </div>
    </>
    
  );
};

export default BookingCalendar;
