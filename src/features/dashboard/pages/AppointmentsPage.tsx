import AppointmentList from '@features/dashboard/components/AppointmentList'

const AppointmentsPage = () => {
  return (
    <div className="grid gap-20 px-6 lg:px-16 py-8 lg:py-20">
      <div className="grid">
        <AppointmentList/>
      </div>
    </div>
  )
}

export default AppointmentsPage