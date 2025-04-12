import { formattedDate } from '@utils/formatter';
import { Appointment } from '@features/dashboard/interaces';

interface AppointmentDetailsProps {
  appointment: Appointment;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
  return (
    <>
      <h3 className="text-xl text-gray-600 tracking-wide font-bold">Appointment Details</h3>
      <hr className="border-b border-green-600 my-6"/>
      <table className="w-full text-left">
        <tbody>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Doctor:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ appointment.doctor.firstName } { appointment.doctor.lastName }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Patient:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ appointment.patient.firstName } { appointment.patient.lastName }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Date:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ formattedDate(appointment.date) }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Current Time:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ appointment.startTime } - { appointment.endTime }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Purpose:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ appointment.service.category } - { appointment.service.name }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Description:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ appointment.service.description }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Status:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>{ appointment.status }</p></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p><strong>Price:</strong></p></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-700"><p>${ appointment.service.price }</p></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default AppointmentDetails