import UpcomingAppointments from '@features/dashboard/components/UpcomingAppointments'
import FeaturedUsers from '@features/dashboard/components/FeaturedUsers'
import AppointmentHistory from '@features/dashboard/components/AppointmentHistory'

const DashboardPage = () => {
  return (
    <div className="grid gap-20 px-6 lg:px-16 py-8 lg:py-20">
      <div className="grid xl:grid-cols-[2fr_3fr] gap-6 items-start">
        <UpcomingAppointments/>
        <FeaturedUsers/>
      </div>
      <div className="grid">
        <AppointmentHistory/>
      </div>
    </div>
  );
}

export default DashboardPage;
