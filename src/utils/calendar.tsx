// Generate available times from 8 AM to 5 PM
import { format } from "date-fns";

const generateAvailableTimes = () => {
  const availableTimes: string[] = [];
  for (let hour = 8; hour <= 17; hour++) {
    const startTimeFormatted = format(new Date().setHours(hour, 0, 0, 0), "h:mm a");
    const endTimeFormatted = format(new Date().setHours(hour + 1, 0, 0, 0), "h:mm a");
    availableTimes.push(`${startTimeFormatted} - ${endTimeFormatted}`);
  }
  return availableTimes;
};

export const calendarEvents = (appointments?: any[]) => {
  const availableTimes = generateAvailableTimes();
  
  // Create events for the calendar (excluding Sundays)
  const calendarEvents: any = [];
  
  // Get the next 60 days and generate events for each day (excluding Sunday)
  for (let i = 1; i < 60; i++) {
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

      const isBooked = appointments?.some((appt) => {
        const apptDate = new Date(appt.date).toISOString().split("T")[0];
        const paddedStart = `${startTime.padStart(5, "0")} ${startMeridiem}`;
        const paddedEnd = `${endTime.padStart(5, "0")} ${endMeridiem}`
        
        return (
          apptDate === formattedDate &&
          appt.startTime === paddedStart &&
          appt.endTime === paddedEnd
        );
      });

    
      calendarEvents.push({
        title: isBooked ? 'Not Available' : 'Available',
        start: `${formattedDate}T${formattedStartTime}:00`,
        end: `${formattedDate}T${formattedEndTime}:00`,
        allDay: false,
        color: isBooked ? "#A0AEC0" : "#38a169",
        editable: !isBooked,
        extendedProps: {
          isBooked: isBooked,
        }
      });
    });
  }

  return calendarEvents;
}