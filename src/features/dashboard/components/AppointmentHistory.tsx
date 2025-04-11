const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' }
]

const AppointmentHistory = () => {
  return (
    <div className="rounded-md shadow-md bg-white p-8">
      <h2 className="font-bold text-xl tracking-wider text-gray-700">Appointment History</h2>
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
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Category
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Subcategory
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Notes
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Reason
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {people.map((person) => (
            <tr key={person.email}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                {person.name}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.title}</td>
              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentHistory